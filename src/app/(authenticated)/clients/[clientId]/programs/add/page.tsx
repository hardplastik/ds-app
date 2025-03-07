"use client";

import { useAuth } from "@/components/contexts/AuthContext";
import ProgramConfigurator from "@/components/domain/program-configurator";
import ProgramForm, { ProgramSeed } from "@/components/domain/program-form";
import { Button } from "@/components/ui/button";
import { saveProgramUser } from "@/services/program-config-service";
import { ConfigProgram } from "@/types/ProgramConfig";
import { ProgramWizardStep } from "@/types/ProgramWizardStep";
import { UserProgram } from "@/types/UserProgram";
import { useQueryClient } from "@tanstack/react-query";
import { SquarePenIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProgramsAddPage():React.ReactElement {

  const params = useParams<{clientId: string}>();
  const {token} = useAuth();

  const [program, setProgram] = useState<ProgramSeed>();
  const [programConfig, setProgramConfig] = useState<ConfigProgram>();

  const [isValid, setIsValid] = useState<boolean>(false);
  const [currentWizardStep, setCurrentWizardStep] = useState<ProgramWizardStep>(ProgramWizardStep.FORM);
  const [isExercisesOpen, setIsExercisesOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const router = useRouter();

  useEffect(() => {
    
    let valid = true;
    valid &&= Boolean(program?.name);
    valid &&= Boolean(program?.sessionPerWeek);
    valid &&= Boolean(program?.startDate);
    valid &&= Boolean(program?.weeks);
    
    setIsValid(valid);
  }, [program]);

  useEffect(() => {
    const isValidConfig = programConfig?.sessions.every((session) => {
      
      if (session.exercises.length === 0) {
        return false;
      }

      const isValidSession = session.exercises.every((exercise) =>
        exercise.sets.every(
          (set) => set.targetReps !== undefined && set.rpe !== undefined
        )
      );

      return isValidSession;
    });

    setIsValid(isValidConfig ?? false);
  }, [programConfig]);

  useEffect(() => {

    if (currentWizardStep > ProgramWizardStep.CONFIGURATION) {
      saveProgram(programConfig as ConfigProgram);
    }

  }, [currentWizardStep]);

  async function saveProgram(programConfig: ConfigProgram): Promise<void> {
    const response: UserProgram = await saveProgramUser(programConfig, token);
    await queryClient.invalidateQueries({queryKey: ['client-programs', params.clientId]});
    setCurrentWizardStep(ProgramWizardStep.FORM);
    setProgram(undefined);
    router.replace(`/clients/${params.clientId}/programs/${response.id}`);
  }

  return (
    <div className="w-full h-full flex-grow flex flex-col bg-slate-50 justify-between overflow-auto p-4">
        {
          currentWizardStep == ProgramWizardStep.FORM 
          && <ProgramForm onUpdate={(value) => setProgram({...value})}/>
        }
        {
          currentWizardStep == ProgramWizardStep.CONFIGURATION 
          && program != null
          && <ProgramConfigurator 
                program={program} 
                onUpdate={setProgramConfig} 
                isExercisesOpen={isExercisesOpen}
                setIsExercisesOpen={setIsExercisesOpen}/>
        }
        {
          currentWizardStep == ProgramWizardStep.SAVING
          && <div className="w-full flex-grow flex flex-col items-center justify-center gap-y-6">
              <SquarePenIcon width={48} height={48} className="text-slate-400"/>
              <h1 className="font-medium text-4xl text-slate-400 text-center">Creando programa, espera un momento</h1>
            </div>
        }
      {!isExercisesOpen && 
        <Button className="w-full" disabled={!isValid} onClick={() => setCurrentWizardStep(currentWizardStep + 1)}>Continuar</Button>}
    </div>
  );
}