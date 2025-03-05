import { formatDuration } from "@/utils/format-duration";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowRightIcon, AwardIcon, CalendarIcon, TrendingDownIcon, WatchIcon } from "lucide-react";
import Link from "next/link";

export interface ActivityCardProps {
  programName: string;
  sessionDate: string;
  isCompleted: boolean;
  sessionWeek: number;
  sessionDay: number;
  sessionDuration: number;
  clientId: string;
  programId: string;
  sessionId: string;
}
export default function ActivityCard({programName, sessionDate, isCompleted, sessionWeek, sessionDay, sessionDuration, clientId, programId, sessionId}: ActivityCardProps) {
  return (
    <Link  href={`/clients/${clientId}/programs/${programId}/sessions/${sessionId}`} prefetch={false}
      className="flex flex-row items-center justify-between rounded-lg bg-white p-3 shadow-around w-full">
      
      <div className="flex flex-col gap-y-2">
      
        <div className="flex flex-row gap-x-1 items-end">
          <span className="font-semibold text-sm text-slate-900">{programName}</span>
          <span className="font-light text-xs text-slate-500">Semana {sessionWeek} - día {sessionDay}</span>
        </div>
      
        <div className="flex flex-row gap-x-1 items-center">
      
          <div className="flex flex-row gap-1 items-center">
            <CalendarIcon className="size-3 text-slate-500" />
            <span className="font-light text-xs text-slate-500">{format(sessionDate, "dd 'de' MMMM 'de' yyyy", {locale: es})}</span>
          </div>
      
          <div className="flex flex-row gap-1 items-center">
            <WatchIcon className="size-3 text-slate-500" />
            <span className="font-light text-xs text-slate-500">{formatDuration(sessionDuration)}</span>
          </div>
      
          <div className="flex flex-row gap-1 items-center">
            {isCompleted ? (
              <AwardIcon className="size-3 text-slate-500" />
            ) : (
              <TrendingDownIcon className="size-3 text-slate-500" />
            )}
            <span className="font-light text-xs text-slate-500">{isCompleted ? "Completado" : "Incompleto"}</span>
          </div>
      
        </div>
      
      </div>

          <ArrowRightIcon className="size-6 text-slate-500" />
    </Link>
  );
}