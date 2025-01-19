import { ConfigSession } from "@/types/ProgramConfig";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ExerciseConfigurator } from "../ui/config-exercises-and-sets";

export interface ProgramSessionConfigProps {
  session: ConfigSession,
  onAddExercises: () => void
}

export default function ProgramSessionConfig({session, onAddExercises}: ProgramSessionConfigProps) {
  return (
    <div className="rounded-md p-3 bg-slate-200/50 space-y-2">
      <span className="font-medium text-xs leading-[14px]">Sesión {session.weekDay}</span>
      {
        session.exercises.length 
        ? <div className="border-t border-slate-300/80 pt-1 space-y-2">
            {
              session.exercises
                .map(exercise => (
                  <ExerciseConfigurator key={exercise.id} disabled exercise={exercise}/>
                ))
            }
          </div>
        : null
      }
      
      <Button variant={'outline'} className="w-full font-medium text-xs" onClick={onAddExercises}>
        <PlusIcon width={16} height={16} />
        Agregar Ejercicio
      </Button>
    </div>
  );
}