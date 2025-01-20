import { completeExercise } from "@/services/client-program-service"
import { validValue } from "@/services/utils"
import { UserProgramExercise, UserProgramSession, UserProgramSet } from "@/types/UserProgram"
import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Checkbox } from "../ui/Checkbox"
import { useDebounce } from "@/hooks/use-debounce"

export interface UserSessionProps {
  session: UserProgramSession,
  onUpdate: () => void
}

export function UserSessionCard({session, onUpdate}: UserSessionProps) {
  return (
    <div  className="bg-slate-200 rounded-md p-3">
      <span className="font-medium text-xs leading-[14px] text-slate-800">Sesión {session.weekDay}</span>
      <div>
        {
          session.exercises
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .map(exercise => (
              <UserExerciseCard key={exercise.id} exercise={exercise} onUpdate={onUpdate} />
            ))
        }
      </div>
    </div>
  )
}

export interface UserExerciseCardProps {
  exercise: UserProgramExercise,
  onUpdate: () => void
}

export function UserExerciseCard({exercise, onUpdate}: UserExerciseCardProps) {
  return (
    <div className="w-full p-0 py-2 border-b border-slate-300/80 [&:last-of-type]:border-none">
      <div className="space-x-2">
        <span className="font-medium text-xs leading-5 text-slate-500">{exercise.orderNumber}</span>
        <span className="font-medium text-xs leading-5 text-slate-800">{exercise.name}</span>
      </div>
      <div className="grid grid-cols-[0.75fr_0.5fr] justify-between text-center gap-x-8 py-2">
        <span className="font-medium text-xs text-slate-500">Objetivos</span>
        <span className="font-medium text-xs text-slate-500">Alcanzado</span>
      </div>
      <div className="space-y-3">
        {
          exercise.sets
          .sort((a,b) => a.orderNumber - b.orderNumber)
          .map(set => (
            <UserSetCard key={set.id} set={set} onUpdate={onUpdate} />
          ))
        }
      </div>
    </div>
  )
}

export interface UserSetCardProps {
  set: UserProgramSet,
  onUpdate: () => void
}

export interface CompleteExerciseSet {
  reps: number,
  weight: number,
  rpe: number,
  isCompleted: boolean
}

export function UserSetCard({set, onUpdate}: UserSetCardProps) {

  const {token} = useAuth();

  function onSetComplete(value: boolean) {
    set.isCompleted = value;
    onUpdate();
  }

  function onSetReps(value: string) {
    set.reps = validValue(value);
    onUpdate();
  }

  function onSetWeight(value: string) {
    set.weight = validValue(value);
    onUpdate();
  }

  function saveSet() {
    const command: CompleteExerciseSet = {
      reps: set.reps || 0,
      weight: set.weight || 0,
      rpe: set.rpe || 0,
      isCompleted: set.isCompleted
    };
    completeExercise(set.id, command, token);
  }

  const onApply = useDebounce(saveSet, 1000);

  useEffect(() => {
    onApply();
  }, [set.isCompleted, set.weight, set.reps]);

  return (
    <div>
      <div className="grid grid-cols-[0.75fr_0.5fr] justify-between gap-x-8">
        <div className="grid grid-cols-4">
          <div className="flex flex-col items-center gap-y-1">
            <span className="font-medium text-xs leading-4 text-slate-500">Set</span>
            <span className="font-bold text-xs leading-5 text-slate-500">{set.orderNumber}</span>
          </div>
          <div className="flex flex-col items-center gap-y-1">
            <span className="font-medium text-xs leading-4 text-slate-500">Peso</span>
            <span className="font-bold text-xs leading-5 text-slate-500">{set.targetWeight}</span>
          </div>
          <div className="flex flex-col items-center gap-y-1">
            <span className="font-medium text-xs leading-4 text-slate-500">Reps</span>
            <span className="font-bold text-xs leading-5 text-slate-500">{set.targetReps}</span>
          </div>
          <div className="flex flex-col items-center gap-y-1">
            <span className="font-medium text-xs leading-4 text-slate-500">RPE</span>
            <span className="font-bold text-xs leading-5 text-slate-500">{set.rpe}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-4">
          <div className="flex flex-col items-center gap-y-1">
            <span className="font-medium text-xs leading-4 text-slate-500">Peso</span>
            <input type="text" placeholder="-" className="w-11 bg-transparent text-xs leading-5 text-center border border-slate-500 rounded-sm" 
              value={set.weight || ''} inputMode="numeric" onChange={(e) => onSetWeight(e.currentTarget.value)}/>
          </div>
          <div className="flex flex-col items-center gap-y-1">
            <span className="font-medium text-xs leading-4 text-slate-500">Reps</span>
            <input type="text" placeholder="-" className="w-11 bg-transparent text-xs leading-5 text-center border border-slate-500 rounded-sm" 
              value={set.reps || ''} inputMode="numeric" onChange={(e) => onSetReps(e.currentTarget.value)}/>
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <span className="font-medium text-xs leading-4 text-slate-500">Comp</span>
            <Checkbox checked={set.isCompleted} onCheckedChange={(checked) => onSetComplete(checked as boolean)} />
          </div>
        </div>
      </div>
    </div>
  )
}