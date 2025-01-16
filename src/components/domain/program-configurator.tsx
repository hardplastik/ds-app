import { ProgramSeed } from "./program-form";
import ProgramWeeksBar from "./program-weeks-bar";

export interface ProgramConfiguratorProps {
  program: ProgramSeed
}

export default function ProgramConfigurator({
  program
}: ProgramConfiguratorProps) {

  console.log(program);

  return (
    <div>
      <ProgramWeeksBar/>
    </div>
  );
}