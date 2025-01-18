import useStoredState from "@/hooks/use-stored-state";
import { ProgramSeed } from "./program-form";
import ProgramWeeksBar from "./program-weeks-bar";
import { ConfigExercise, ConfigProgram, ConfigSession, ConfigWeek } from "@/types/ProgramConfig";
import { buildProgramSchema } from "@/services/program-config-service";
import { useState } from "react";
import ProgramSessionConfig from "./program-session-config";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { listExercises } from "@/services/exercises";
import { useAuth } from "../contexts/AuthContext";
import SelectExercises from "../ui/select-exercises";
import ExerciseAndSetConfigurator from "../ui/config-exercises-and-sets";

export interface ProgramConfiguratorProps {
  program: ProgramSeed
}

export default function ProgramConfigurator({
  program
}: ProgramConfiguratorProps) {

  const {token} = useAuth();

  const [programConfig, setProgramConfig] = useStoredState<ConfigProgram>('program-config', buildProgramSchema(program));
  const [currentWeek, setCurrentWeek] = useState<ConfigWeek>(programConfig.weeks[0]);

  const [currentSession, setCurrentSession] = useState<ConfigSession>(currentWeek.sessions[0]);

  const [isExercisesOpen, setIsExercisesOpen] = useState<boolean>(false);
  const [isConfigExercisesSetsOpen, setIsConfigExercisesSetsOpen] = useState<boolean>(false);

    const {data: exercisesCatalog} = useQuery({
      queryKey: ['exercises-catalog'],
      queryFn: () => listExercises(token)
    })

  function onSelectWeek(value: string | number) {
    const selectedWeek = programConfig.weeks.find(week => week.weekNumber == value);
    setCurrentWeek(selectedWeek as ConfigWeek);
  }

  function onSetExercises(exercises: ConfigExercise[]) {
    currentSession.exercises = exercises;
    setCurrentSession({...currentSession});
    setIsExercisesOpen(false);
    setIsConfigExercisesSetsOpen(true);
  }

  function onOpenSelectExercises(session: ConfigSession) {
    setCurrentSession(session);
    setIsExercisesOpen(true);
  }

  function onConfigSession() {
    setIsConfigExercisesSetsOpen(false);
    setProgramConfig({...programConfig})
  }

  return (
    <div className="w-full flex-grow space-y-3">
      <ProgramWeeksBar value={currentWeek.weekNumber} onSelect={onSelectWeek} options={programConfig.weeks.map(week => ({value: week.weekNumber, label: `Semana ${week.weekNumber}`}))}/>
      
      <div className="w-full flex flex-row justify-between">
        <h2 className="font-semibold text-sm leading-5 text-outer-space-500">Sesiones</h2>
        <span className="font-semibold text-sm text-slate-400">{currentWeek.sessions.length}/{program.weeks}</span>
      </div>
      {
        currentWeek.sessions
        .map(session => (
          <ProgramSessionConfig key={session.weekDay} session={session} onAddExercises={() => onOpenSelectExercises(session)} /> 
        ))
      }
      <Button variant={'outline'} className="w-full font-medium text-xs">
        <PlusIcon width={16} height={16} />
        Agregar Sesión
      </Button>

      <SelectExercises isOpen={isExercisesOpen} exercisesCatalog={exercisesCatalog || []} session={currentSession} onClose={() => setIsExercisesOpen(false)} onSelect={onSetExercises} />
      <ExerciseAndSetConfigurator isOpen={isConfigExercisesSetsOpen} session={currentSession} onClose={onConfigSession} onUpdate={() => {setCurrentSession({...currentSession})}}/>
   
   </div>
  );
}