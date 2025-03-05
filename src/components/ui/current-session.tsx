'use client'

import { ActivityIcon, BicepsFlexedIcon, BikeIcon, DumbbellIcon, TargetIcon, TimerIcon, WeightIcon } from "lucide-react";
import IconLabel from "./icon-label";
import { UserCurrentSession } from "@/types/UserProgram";

/**
 * Props del componente CurrentSession
 */
interface CurrentSessionProps {
  /** Datos de la sesión actual del usuario */
  session: UserCurrentSession;
}

/**
 * Componente que muestra el programa actual del cliente
 * con su nombre y detalles de la sesión.
 * 
 * @param props - Props del componente {@link CurrentSessionProps}
 */
export default function CurrentSession({ 
  session
}: CurrentSessionProps) {
  return (
    <div className="flex flex-col gap-y-2 rounded-3xl bg-blue-900 p-3">
      <div className="flex flex-col">
        <span className="font-normal text-xs text-white">Programa actual</span>
        <span className="font-medium text-4xl text-white">{session.program.name}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <div className="flex flex-row gap-x-3 items-center">
          <IconLabel 
            icon={TargetIcon}
            label={session.program.goal}
          />
          <IconLabel 
            icon={BicepsFlexedIcon}
            label={session.program.phase}
          />
        </div>
        <div className="flex flex-row gap-x-3 items-center">
          <IconLabel 
            icon={ActivityIcon}
            label={session.program.intensity}
          />
          <IconLabel 
            icon={BikeIcon}
            label={`${session.program.sessionsPerWeek} sesiones/semana`}
          />
        </div>
        <div className="flex flex-row gap-x-3 items-center">
          <IconLabel 
            icon={DumbbellIcon}
            label={`${session.program.minReps}-${session.program.maxReps} reps`}
          />
          <IconLabel 
            icon={WeightIcon}
            label={`RIR ${session.program.rirMin}-${session.program.rirMax}`}
          />
        </div>
        <div className="flex flex-row gap-x-3 items-center">
          <IconLabel 
            icon={TimerIcon}
            label={`${session.program.weeks} semanas`}
          />
        </div>
      </div>
    </div>
  );
} 