import { Exercise } from "@/types/Exercise";
import { ConfigExercise, ConfigSession } from "@/types/ProgramConfig";
import NavBarHeader from "./nav-bar-header";
import { Button } from "./button";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export interface SelectExercisesProps {
  session: ConfigSession;
  exercisesCatalog: Exercise[];
  isOpen: boolean;
  onSelect: (exercises: ConfigExercise[]) => void;  
  onClose: () => void
}

export default function SelectExercises({
  session,
  exercisesCatalog,
  isOpen,
  onSelect,
  onClose
}: SelectExercisesProps) {

  const [selectedExercises, setSelectedExercises] = useState<ConfigExercise[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  useEffect(() => {
    const exercises = JSON.parse(JSON.stringify(session.exercises));
    setSelectedExercises(exercises);
  }, [session, isOpen]);

  function onSelectExercise(exercise: Exercise) {

    const exerciseIndex = selectedExercises.findIndex(e => e.id == exercise.id);

    if (exerciseIndex == -1) {
      selectedExercises.push({
        id: exercise.id,
        name: exercise.name,
        orderNumber: selectedExercises.length + 1,
        notes: '',
        sets: [{
          orderNumber: 1,
        }]
      });
    } else {
      selectedExercises.splice(exerciseIndex, 1);
    }

    
    setSelectedExercises([...selectedExercises]);
  }

  function onSetExercises() {
    const exercises = JSON.parse(JSON.stringify(selectedExercises));
    onSelect(exercises);
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full flex justify-between flex-col overflow-hidden bg-slate-50" style={{margin: 0}}>
      <div className="w-full h-full flex-grow flex flex-col overflow-hidden">
        <NavBarHeader title={
          <div className="w-full grid grid-cols-[53px_1fr_53px]">
            <button className="font-bold text-xs leading-[14px] text-center" onClick={onClose}>Regresar</button>
            <span className="font-medium text-sm leading-4 text-center">Agregar Ejercicio</span>
            <div className="col-span-3"></div>
          </div>
        }/>
        <div className="w-full h-full flex-grow space-y-2 p-4 overflow-auto">
        <div className="w-full flex flex-row items-center gap-x-2 text-base text-slate-800 px-3 border border-slate-300 h-10 rounded-md">
            <SearchIcon width={20} height={20} className="text-slate-500" />
            <input className="w-full h-full p-0 flex-grow outline-none bg-transparent border-none" value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)}/>
        </div>
          {
            exercisesCatalog
            .filter(exercise => searchTerm ? exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
            .map(exercise => (
              <SelectExerciseItem key={exercise.id} exercise={exercise} selectNumber={selectedExercises.find(e=> e.id == exercise.id)?.orderNumber} onSelect={onSelectExercise} />
            ))
          }
        </div>
      </div>
      <div className="w-full p-4">
        <Button className="w-full" onClick={onSetExercises}>Agregar ejercicios</Button>
      </div>
    </div>
  );
}

export interface SelectExerciseItemProps {
  exercise: Exercise,
  selectNumber?: number,
  onSelect: (exercise: Exercise) => void
}

export function SelectExerciseItem({exercise, selectNumber, onSelect}: SelectExerciseItemProps) {
  return (
    <button className={cn("relative p-3 rounded-lg w-full flex flex-col gap-y-[2px] bg-slate-200 shadow-md", selectNumber && "outline outline-1 outline-primary")} onClick={() => onSelect(exercise)}>
      <span className="font-medium text-xs leading-5 text-slate-800 -mb-1">{exercise.name}</span>
      <div className="flex flex-row items-center gap-x-1">
        {
          exercise.groups.filter(group => group.isPrincipal)
          .map((group, index, arr) => (
            <React.Fragment key={`${exercise.id}_${group.id}`}>
              <span className="font-normal text-xs leading-4 text-slate-500"> {group.name} </span>
              {
                arr.length > index + 1 
                ? <span className="font-normal text-[8px] leading-4 text-slate-500">|</span>
                : null
              }
            </React.Fragment>
          ))
        }
      </div>
      {
        selectNumber 
        ? <span className="absolute rounded-full right-4 top-1/2 -translate-y-1/2 font-bold text-xs leading-3 bg-slate-800 text-slate-50 size-4 p-1 flex flex-col items-center justify-center">{selectNumber}</span>
        : null
      }
    </button>
  )
}