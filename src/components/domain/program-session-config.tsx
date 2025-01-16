import { ConfigSession } from "@/types/ProgramConfig";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

export interface ProgramSessionConfigProps {
  session: ConfigSession
}

export default function ProgramSessionConfig({session}: ProgramSessionConfigProps) {
  return (
    <div className="rounded-md p-3 bg-slate-200/50 space-y-2">
      <span className="font-medium text-xs leading-[14px]">Sesión {session.weekDay}</span>
      <Button variant={'outline'} className="w-full font-medium text-xs">
        <PlusIcon width={16} height={16} />
        Agregar Ejercicio
      </Button>
    </div>
  );
}