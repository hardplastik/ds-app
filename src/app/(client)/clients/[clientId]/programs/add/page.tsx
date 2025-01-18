"use client";

import ProgramConfigurator from "@/components/domain/program-configurator";
import ProgramForm, { ProgramSeed } from "@/components/domain/program-form";
import { Button } from "@/components/ui/button";
import { ConfigProgram } from "@/types/ProgramConfig";
import { useQueryClient } from "@tanstack/react-query";
import { SquarePenIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export enum ProgramWizardStep {
  FORM = 1,
  CONFIGURATION = 2,
  SAVING = 3
}

export default function ProgramsAddPage() {

  const params = useParams<{clientId: string}>();

  const [program, setProgram] = useState<ProgramSeed>();
  const [programConfig, setProgramConfig] = useState<ConfigProgram>();

  const [isValid, setIsValid] = useState<boolean>(false);
  const [currentWizardStep, setCurrentWizardStep] = useState<ProgramWizardStep>(ProgramWizardStep.FORM);

  const queryClient = useQueryClient();

  useEffect(() => {
    
    let valid = true;
    valid &&= Boolean(program?.name);
    valid &&= Boolean(program?.sessionPerWeek);
    valid &&= Boolean(program?.startDate);
    valid &&= Boolean(program?.weeks);
    
    setIsValid(valid);
  }, [program]);

  useEffect(() => {

    //TODO: Valid program config

  }, [programConfig])

  useEffect(() => {

    if (currentWizardStep > ProgramWizardStep.CONFIGURATION) {
      saveProgram(programConfig as ConfigProgram);
    }

  }, [currentWizardStep]);

  function saveProgram(programConfig: ConfigProgram): void {
    //TODO save program config
    console.log(programConfig);
    queryClient.invalidateQueries({queryKey: ['client-programs', params.clientId]});
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
          && <ProgramConfigurator program={program} onUpdate={setProgramConfig}/>
        }
        {
          currentWizardStep == ProgramWizardStep.SAVING
          && <div className="w-full flex-grow flex flex-col items-center justify-center gap-y-6">
              <SquarePenIcon width={48} height={48} className="text-slate-400"/>
              <h1 className="font-medium text-4xl text-slate-400 text-center">Creando programa, espera un momento</h1>
            </div>
        }
      <Button className="w-full" disabled={!isValid} onClick={() => setCurrentWizardStep(currentWizardStep + 1)}>Continuar</Button>
    </div>
  );
}