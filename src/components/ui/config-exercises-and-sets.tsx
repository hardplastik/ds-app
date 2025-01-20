import { cn } from "@/lib/utils";
import { ConfigExercise, ConfigSession, ConfigSet } from "@/types/ProgramConfig";
import { ClipboardPlusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "./button";
import NavBarHeader from "./nav-bar-header";
import { validValue } from "@/services/utils";

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
          <div className="w-full grid grid-cols-[53px_1fr_53px]">
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
        <div className="w-full p-4">
          <Button className="w-full" onClick={onClose}>Continuar</Button>
        </div>
    </div>
  );
}

export interface ExerciseConfiguratorProps {
  exercise: ConfigExercise
  disabled?: boolean
  onUpdate?: () => void
}

export function ExerciseConfigurator({exercise, disabled, onUpdate}: ExerciseConfiguratorProps) {

  function onAddNewSet() {
    exercise.sets.push({
      orderNumber: exercise.sets.length + 1
    });

    if (onUpdate) {
      onUpdate();
    }
  }

  function onCopySet(set: ConfigSet) {
    exercise.sets.push({
      ...set,
      orderNumber: set.orderNumber + 1
    });
    if (onUpdate) {
      onUpdate();
    }
  }

  function onDeleteSet(set: ConfigSet) {
    const setIndex = exercise.sets.findIndex(s => s.orderNumber == set.orderNumber);
    if(setIndex > -1) {
      exercise.sets.splice(setIndex, 1);
    }
    if (onUpdate) {
      onUpdate();
    }
  }

  return (
    <div className={cn("rounded-md w-full bg-slate-200 p-3 space-y-4", disabled && 'bg-transparent p-0 border-b border-slate-300/80 rounded-none [&:last-of-type]:border-none space-y-0')}>
      <div className="space-x-2">
        <span className="font-medium text-xs leading-5 text-slate-500">{exercise.orderNumber}</span>
        <span className="font-medium text-xs leading-5 text-slate-800">{exercise.name}</span>
      </div>
      <div className="space-y-2">
        {
          exercise.sets
          .map((set) => (
            <SetConfigurator key={set.orderNumber} set={set} disabled={disabled} onUpdate={onUpdate} 
              isLastSet={exercise.sets.length == set.orderNumber}
              onCopySet={onCopySet} onDeleteSet={onDeleteSet}
            />
          ))
        }
      </div>
      {
        !disabled 
        ? <Button variant={'outline'} className="w-full border-slate-500 text-slate-500" onClick={onAddNewSet}>
            <PlusIcon/>
            <span>Agregar Set</span>
          </Button>
      : null
      }
    </div>
  )
}

export interface SetConfiguratorProps {
  set: ConfigSet,
  disabled?: boolean
  onUpdate?: () => void
  onCopySet: (set: ConfigSet) => void
  isLastSet: boolean
  onDeleteSet: (set: ConfigSet) => void
}

export function SetConfigurator({set, disabled, onUpdate, onCopySet, isLastSet, onDeleteSet}: SetConfiguratorProps) {

  function onTargetRepsChange(value: string) {
    set.targetReps = validValue(value);
    if (onUpdate) {
      onUpdate()
    }
  }

  function onRpeChange(value: string) {
    set.rpe = validValue(value);
    if (onUpdate) {
      onUpdate()
    }
  }

  function onWeightChange(value: string) {
    set.targetWeight = validValue(value);
    if (onUpdate) {
      onUpdate()
    }
  }


  return (
    <div className="space-y-1">
      <div className="grid grid-cols-5 font-normal text-xs leading-4 text-slate-500 items-center">
        
        <div className="flex flex-col gap-y-1 items-center">
          <span>Set</span>
          <span className="flex flex-col justify-center px-2 py-1">{set.orderNumber}</span>
        </div>

        <div className="flex flex-col gap-y-1 items-center">
          <span>Reps</span>
          <input type="text" placeholder="-" disabled={disabled} value={set.targetReps || ''} className="w-11 text-center rounded-sm py-1 px-3 border border-slate-500 bg-transparent disabled:border-none" inputMode="numeric" onChange={(e) => onTargetRepsChange(e.currentTarget.value)}/>
        </div>

        <div className="flex flex-col gap-y-1 items-center">
          <span>Carga</span>
          <input type="text" placeholder="-" disabled={disabled} value={set.targetWeight || ''} className="w-11 text-center rounded-sm py-1 px-3 border border-slate-500 bg-transparent disabled:border-none" inputMode="numeric" onChange={(e) => onWeightChange(e.currentTarget.value)}/>
        </div>

        <div className="flex flex-col gap-y-1 items-center">
          <span>RPE</span>
          <input type="text" placeholder="-" disabled={disabled} value={set.rpe || ''} className="w-11 text-center rounded-sm py-1 px-3 border border-slate-500 bg-transparent disabled:border-none" inputMode="numeric" onChange={(e) => onRpeChange(e.currentTarget.value)}/>
        </div>
        {
          isLastSet && !disabled &&
          <div className="flex flex-row gap-x-3">
              <button className="pt-4" onClick={() => onDeleteSet(set)}>
                  <Trash2Icon width={20} height={20}/>
              </button>
              <button className="copy-set pt-4" onClick={() => {onCopySet(set)}}>
                <ClipboardPlusIcon widths={20} height={20}/>
              </button>
          </div>
        }
        
      </div>
    </div>
  )
}