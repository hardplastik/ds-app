"use client";

import ProgramConfigurator from "@/components/domain/program-configurator";
import ProgramForm, { ProgramSeed } from "@/components/domain/program-form";
import { Button } from "@/components/ui/button";
import useStoredState from "@/hooks/use-stored-state";
import { useEffect, useState } from "react";


export enum ProgramWizardStep {
  FORM = 1,
  CONFIGURATION = 2,
  EXERCISE_SELECT = 3
}

export default function ProgramsAddPage() {

  const [program] = useStoredState<ProgramSeed|null>('program', null);
  const [isValid, setIsvalid] = useState<boolean>(false);
  const [currentWizardStep, setCurrentWizardStep] = useState<ProgramWizardStep>(ProgramWizardStep.CONFIGURATION);

  useEffect(() => {
    
    let valid = true;
    valid &&= Boolean(program?.name);
    valid &&= Boolean(program?.sessionPerWeek);
    valid &&= Boolean(program?.startDate);
    valid &&= Boolean(program?.weeks);

    setIsvalid(valid);

  }, [program]);

  return (
    <div className="w-full h-full flex-grow flex flex-col bg-slate-50 justify-between overflow-auto p-4">
        {
          currentWizardStep == ProgramWizardStep.FORM 
          && <ProgramForm/>
        }
        {
          currentWizardStep == ProgramWizardStep.CONFIGURATION 
          && program != null
          && <ProgramConfigurator program={program}/>
        }
      <Button className="w-full" disabled={!isValid} onClick={() => setCurrentWizardStep(currentWizardStep + 1)}>Continuar</Button>
    </div>
  );
}