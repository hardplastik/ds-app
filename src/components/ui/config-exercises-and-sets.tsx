import { ConfigExercise, ConfigSession, ConfigSet } from "@/types/ProgramConfig";
import NavBarHeader from "./nav-bar-header";
import { Button } from "./button";
import { PlusIcon } from "lucide-react";

export interface ExerciseAndSetConfiguratorProps {
  session: ConfigSession
  isOpen: boolean
  onUpdate: () => void
  onClose: () => void
}

export default function ExerciseAndSetConfigurator({session, isOpen, onUpdate, onClose}: ExerciseAndSetConfiguratorProps) {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full flex justify-between flex-col overflow-hidden bg-slate-50" style={{margin: 0}}>
        <NavBarHeader title={
          <div className="w-full grid grid-cols-[53px_1fr_53px] px-4 py-3">
            <button className="font-bold text-xs leading-[14px] text-center" onClick={onClose}>Cerrar</button>
            <span className="font-medium text-sm leading-4 text-center">Semana {session.weekNumber} | Sessión {session.weekDay}</span>
            <div className="col-span-3"></div>
          </div>
        }/>
        <div className="w-full h-full flex-grow overflow-auto p-4 space-y-4">
            {
              session.exercises.map(exercise => (
                <ExerciseConfigurator key={exercise.id} exercise={exercise} onUpdate={onUpdate}/>
              ))
            }
        </div>
    </div>
  );
}

export interface ExerciseConfiguratorProps {
  exercise: ConfigExercise
  onUpdate: () => void
}

export function ExerciseConfigurator({exercise, onUpdate}: ExerciseConfiguratorProps) {

  function onAddNewSet() {
    exercise.sets.push({
      orderNumber: exercise.sets.length + 1
    });
    onUpdate();
  }

  return (
    <div className="rounded-md w-full bg-slate-200 p-3 space-y-4">
      <div className="space-x-2">
        <span className="font-medium text-xs leading-5 text-slate-500">{exercise.orderNumber}</span>
        <span className="font-medium text-xs leading-5 text-slate-800">{exercise.name}</span>
      </div>
      <div>
        {
          exercise.sets
          .map(set => (
            <SetConfigurator key={set.orderNumber} set={set}/>
          ))
        }
      </div>
      <Button variant={'outline'} className="w-full border-slate-500 text-slate-500" onClick={onAddNewSet}>
        <PlusIcon/>
        <span>Agregar Set</span>
      </Button>
    </div>
  )
}

export interface SetConfiguratorProps {
  set: ConfigSet
}

export function SetConfigurator({set}: SetConfiguratorProps) {
  return (
    <div>
      <div className="grid grid-cols-3 font-normal text-xs leading-4 text-slate-500 justify-between">
        <span className="border">Set</span>
        <span>Reps</span>
        <span>RPE</span>
      </div>
      <div className="grid grid-cols-3 font-normal text-sm align-middle leading-5 text-slate-700">
        <span className="flex flex-col justify-center px-2">{set.orderNumber}</span>
        <input type="text" placeholder="-" className="w-11 text-center rounded-sm py-1 px-3 border border-slate-500 bg-transparent"/>
        <input type="text" placeholder="-" className="w-11 text-center rounded-sm py-1 px-3 border border-slate-500 bg-transparent"/>
      </div>
    </div>
  )
}