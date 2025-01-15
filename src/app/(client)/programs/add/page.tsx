"use client";

import ProgramForm, { Program } from "@/components/domain/program-form";
import { Button } from "@/components/ui/button";
import useStoredState from "@/hooks/use-stored-state";
import { useEffect, useState } from "react";

export default function ProgramsAddPage() {

  const [program, setProgram] = useStoredState<Program>('program', null);

  const [isValid, setIsvalid] = useState<boolean>(false);



  useEffect(() => {
    
    let valid = true;
    valid &&= Boolean(program?.name);
    valid &&= Boolean(program?.sessionPerWeek);
    valid &&= Boolean(program?.startDate);
    valid &&= Boolean(program?.weeks);

    setIsvalid(valid);

  }, [program]);

  return (
    <div className="w-full h-full flex-grow flex flex-col justify-between overflow-auto p-4">
      <div>
        <ProgramForm onUpdate={(value) => setProgram(value)}/>
      </div>
      <Button className="w-full" disabled={!isValid}>Continuar</Button>
    </div>
  );
}