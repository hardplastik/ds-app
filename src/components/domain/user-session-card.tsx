import { UserProgramExercise, UserProgramSession, UserProgramSet } from "@/types/UserProgram"
import { Checkbox } from "../ui/Checkbox"
import { useAuth } from "../contexts/AuthContext"
import { useState } from "react"
import { CheckedState } from "@radix-ui/react-checkbox"
import { completeExercise } from "@/services/client-program-service"

export interface UserSessionProps {
  session: UserProgramSession
}

export function UserSessionCard({session}: UserSessionProps) {
  return (
    <div  className="bg-slate-200 rounded-md p-3">
      <span className="font-medium text-xs leading-[14px] text-slate-800">Sesión {session.weekDay}</span>
      <div>
        {
          session.exercises
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .map(exercise => (
              <UserExerciseCard key={exercise.id} exercise={exercise} />
            ))
        }
      </div>
    </div>
  )
}

export interface UserExerciseCardProps {
  exercise: UserProgramExercise
}

export function UserExerciseCard({exercise}: UserExerciseCardProps) {
  return (
    <div className="rounded-md w-full p-0 border-b border-slate-300/80 [&:last-of-type]:border-none">
      <div className="space-x-2">
        <span className="font-medium text-xs leading-5 text-slate-500">{exercise.orderNumber}</span>
        <span className="font-medium text-xs leading-5 text-slate-800">{exercise.name}</span>
      </div>
      <div>
        {
          exercise.sets
          .sort((a,b) => a.orderNumber - b.orderNumber)
          .map(set => (
            <UserSetCard key={set.id} set={set} />
          ))
        }
      </div>
    </div>
  )
}

export interface UserSetCardProps {
  set: UserProgramSet
}

export interface CompleteExerciseSet {
  reps: number,
  weight: number,
  rpe: number,
  isCompleted: boolean
}

export function UserSetCard({set}: UserSetCardProps) {

  const {token} = useAuth();
  const [isChecked, setIsChecked] = useState(set.isCompleted);
  const [inputReps, setInputReps] = useState<number>(set.reps || 0);
  const [inputWeight, setInputWeight] = useState<number>(set.weight || 0);

  const handleCheckboxChange = async (checked: CheckedState) => {
    setIsChecked(checked === true);

    const command: CompleteExerciseSet = {
      reps: inputReps,
      weight: inputWeight,
      rpe: set.rpe || 0,
      isCompleted: checked === true,
    };
    try {
      await completeExercise(set.id, command, token);
    } catch (error) {
      console.error("Error al completar el ejercicio:", error);
    }
  };

  const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputReps(Number(event.target.value));
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWeight(Number(event.target.value));
  };

  return (
    <div>
      <div className="grid grid-cols-[0.75fr_0.5fr] justify-between gap-x-8">
        <div className="grid grid-cols-4">
          <div className="flex flex-col items-center">
            <span className="font-normal text-xs leading-4 text-slate-500">Set</span>
            <span className="font-normal text-xs leading-5 text-slate-800">{set.orderNumber}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-normal text-xs leading-4 text-slate-500">Reps Obj</span>
            <span className="font-normal text-xs leading-5 text-slate-800">{set.targetReps}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-normal text-xs leading-4 text-slate-500">Peso Obj</span>
            <span className="font-normal text-xs leading-5 text-slate-800">{set.targetWeight}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-normal text-xs leading-4 text-slate-500">RPE</span>
            <span className="font-normal text-xs leading-5 text-slate-800">{set.rpe}</span>
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div className="flex flex-col items-center">
            <span className="font-bold text-xs leading-4 text-slate-500">Peso</span>
            <input
              type="number"
              value={inputWeight}
              onChange={handleWeightChange}
              className="text-center border rounded px-1 text-xs w-7 h-7 border-slate-500"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xs leading-4 text-slate-500">Reps</span>
            <input
              type="number"
              value={inputReps}
              onChange={handleRepsChange}
              className="text-center border rounded px-1 text-xs w-7 h-7 border-slate-500"
            />
          </div>
          <div className="flex flex-col items-center gap-y-1">
            <span className="font-bold text-xs leading-4 text-slate-500">Comp</span>
            <Checkbox checked={isChecked} onCheckedChange={(checked) => handleCheckboxChange(checked as boolean)} />
          </div>
        </div>
      </div>
    </div>
  )
}