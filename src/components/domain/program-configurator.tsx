import { listExercises } from "@/services/exercises";
import { buildProgramSchema } from "@/services/program-config-service";
import { ConfigExercise, ConfigProgram, ConfigSession } from "@/types/ProgramConfig";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ExerciseAndSetConfigurator from "../ui/config-exercises-and-sets";
import SelectExercises from "../ui/select-exercises";
import { ProgramSeed } from "./program-form";
import ProgramSessionConfig from "./program-session-config";
import ProgramWeeksBar from "./program-weeks-bar";
import { useParams } from "next/navigation";

export interface ProgramConfiguratorProps {
  program: ProgramSeed
  onUpdate: (value: ConfigProgram) => void
}

export default function ProgramConfigurator({
  program,
  onUpdate
}: ProgramConfiguratorProps) {

  const {token} = useAuth();
  const params = useParams<{clientId: string}>();

  const [programConfig, setProgramConfig] = useState<ConfigProgram>(buildProgramSchema(program, params.clientId));
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [currentSession, setCurrentSession] = useState<number>(0);

  const [isExercisesOpen, setIsExercisesOpen] = useState<boolean>(false);
  const [isConfigExercisesSetsOpen, setIsConfigExercisesSetsOpen] = useState<boolean>(false);

  const {data: exercisesCatalog} = useQuery({
    queryKey: ['exercises-catalog'],
    queryFn: () => listExercises(token)
  })

  function getActualSession(): ConfigSession {
    return programConfig.sessions[currentSession];
  }

  function onSetExercises(exercises: ConfigExercise[]) {
    const session = getActualSession();
    session.exercises = JSON.parse(JSON.stringify(exercises));
    setProgramConfig({...programConfig});
    setIsExercisesOpen(false);
    setIsConfigExercisesSetsOpen(true);
  }

  function onOpenSelectExercises(sessionIndex: number) {
    setCurrentSession(sessionIndex);
    setIsExercisesOpen(true);
  }

  function onConfigSession() {
    setIsConfigExercisesSetsOpen(false);
  }

  function onUpdateExercisesConfig() {
    setProgramConfig({...programConfig});
  }

  useEffect(() => {
    onUpdate(programConfig);
  }, [programConfig]);

  return (
    <div className="w-full flex-grow space-y-3">
      <ProgramWeeksBar value={currentWeek} onSelect={(value) => setCurrentWeek(value as number)} options={Array.from({ length: programConfig.sessions.length / program.sessionPerWeek }, (_, i) => ({value: i + 1, label: `Semana ${i + 1}`}))}/>
      
      <div className="w-full flex flex-row justify-between">
        <h2 className="font-semibold text-sm leading-5 text-outer-space-500">Sesiones</h2>
      </div>
      {
        programConfig.sessions
        .map((session, sessionIndex) => (
          <ProgramSessionConfig key={`${session.weekNumber}-${session.weekDay}`} session={session} onAddExercises={() => onOpenSelectExercises(sessionIndex)}/>))
      }
      <SelectExercises isOpen={isExercisesOpen} exercisesCatalog={exercisesCatalog || []} session={getActualSession()} onClose={() => setIsExercisesOpen(false)} onSelect={onSetExercises} />
      <ExerciseAndSetConfigurator isOpen={isConfigExercisesSetsOpen} session={getActualSession()} onClose={onConfigSession} onUpdate={onUpdateExercisesConfig}/>
    </div>
  );
}