import { UserProgram } from "@/types/UserProgram";
import { Label } from "@radix-ui/react-label";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { Card, CardHeader } from "./card";

export interface UserProgramCardProps {
  program: UserProgram
}

export default function UserProgramCard({program}: UserProgramCardProps) {
  return (
    <Card className="w-full bg-slate-50 rounded-sm border-slate-200 shadow border">
        <CardHeader className="flex flex-col">
          <div className="flex flex-col gap-y-1">
            <div className="flex flex-col">
              <Label className="font-bold text-lg text-slate-800">{program.name}</Label>
            </div>
            <div className="w-full border-t border-slate-200 mb-2" />
            <div className="flex flex-col gap-x-1 gap-y-1">
              <span className="font-medium text-xs text-slate-600">Semanas {program.weeks} - Sesiones por semana {program.sessionsPerWeek}</span>
              <span className="font-medium text-xs text-slate-600">{format(new Date(program.enrollDatetime), "dd 'de' MMMM 'de' yyyy", {locale: es})}</span>
            </div>
          </div>
        </CardHeader>
      </Card>
  );
}