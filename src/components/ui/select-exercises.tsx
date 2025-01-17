import { Exercise } from "@/types/Exercise";
import { ConfigExercise, ConfigSession } from "@/types/ProgramConfig";
import NavBarHeader from "./nav-bar-header";
import { Button } from "./button";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface SelectExercisesProps {
  session: ConfigSession;
  exercisesCatalog: Exercise[];
  onSelect: (exercises: ConfigExercise[]) => void;  
}

export default function SelectExercises({
  session,
  exercisesCatalog,
  onSelect
}: SelectExercisesProps) {

  const [selectedExercises, setSelectedExercises] = useState<ConfigExercise[]>(session.exercises);

  function onSelectExercise(exercise: Exercise) {

    const exerciseIndex = selectedExercises.findIndex(e => e.id == exercise.id);

    if (exerciseIndex == -1) {
      selectedExercises.push({
        id: exercise.id,
        orderNumber: selectedExercises.length + 1,
        notes: '',
        sets: []
      });
    } else {
      selectedExercises.splice(exerciseIndex, 1);
    }

    
    setSelectedExercises([...selectedExercises]);
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full flex justify-between flex-col overflow-hidden bg-slate-50" style={{margin: 0}}>
      <div className="w-full h-full flex-grow flex flex-col overflow-hidden">
        <NavBarHeader title={
          <div className="w-full grid grid-cols-[53px_1fr_53px] px-4 py-3">
            <button className="font-bold text-xs leading-[14px] text-center">Regresar</button>
            <span className="font-medium text-sm leading-4 text-center">Agregar Ejercicio</span>
            <div className="col-span-3"></div>
          </div>
        }/>
        <div className="w-full h-full flex-grow space-y-2 p-4 overflow-auto">
          {
            exercisesCatalog.map(exercise => (
              <SelectExerciseItem key={exercise.id} exercise={exercise} selectNumber={selectedExercises.find(e=> e.id == exercise.id)?.orderNumber} onSelect={onSelectExercise} />
            ))
          }
        </div>
      </div>
      <div className="w-full p-4">
        <Button className="w-full" onClick={() => onSelect(selectedExercises)}>Agregar ejercicios</Button>
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