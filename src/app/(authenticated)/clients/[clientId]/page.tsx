"use client";
import ActivityCard from "@/components/activity-card";
import { useAuth } from "@/components/contexts/AuthContext";
import QuickAccess from "@/components/quick-access";
import CurrentSession from "@/components/ui/current-session";
import EmptyActivity from "@/components/ui/empty-activity";
import { getClient, getClientCurrentSession, getClientSessions } from "@/services/clients";
import { UserCurrentSession } from "@/types/UserProgram";
import { useQuery } from "@tanstack/react-query";
import { BikeIcon, CalculatorIcon, ChartLineIcon, TimerIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function ClientPage() {

  const {token} = useAuth();
  const params = useParams<{clientId: string}>();

  const { data: client } = useQuery({
    queryKey: ['clients', params.clientId],
    queryFn: () => getClient(params.clientId, token)
  });

  const {data: sessions} = useQuery({
    queryKey: ['client-sessions', params.clientId],
    queryFn: () => getClientSessions(params.clientId, token)
  });

  const {data: currentSession} = useQuery({
    queryKey: ['client-current-session', params.clientId],
    queryFn: () => getClientCurrentSession(params.clientId, token)
  });

  return (
    <div className="w-full h-full flex flex-col pt-6 gap-y-4 overflow-auto">
      <div className="flex-none flex flex-col px-3">
        <h2 className="font-light text-base">Bienvenido</h2>
        <h1 className="font-bold text-5xl text-slate-900">{client?.name} {client?.lastName}</h1>
      </div>

      

      <div className="px-3">
        {Boolean(currentSession) && <CurrentSession session={currentSession as UserCurrentSession} />}
      </div>

      <div className="flex flex-col gap-y-4">
        <h2 className="font-semibold text-3xl text-slate-900 px-3">Actividad Reciente</h2>
        
        <div className="w-full flex flex-col gap-y-4 px-3">
            {
              Boolean(sessions?.length) ? (
                sessions?.map((session) => (
                  <ActivityCard key={session.id}  programName="Programa 1" sessionDate={'2025-01-01'} isCompleted={true} sessionWeek={1} sessionDay={1} sessionDuration={1800} 
                clientId={params.clientId} programId={sessions?.[0].program.id || ''} sessionId={sessions?.[0].id || ''} />
                ))
              ) : (
                <EmptyActivity message="Aún no tienes actividad reciente" />
            )}
        </div>

      </div>


      <div className="flex-none flex flex-col">

        <h2 className="font-semibold text-3xl px-3 text-slate-900">Acesso rápido</h2>

        <div className="flex flex-row gap-x-4 py-4 px-3 overflow-x-auto snap-x snap-mandatory h-[11.25em] scroll-pl-[0.75em]">

          <div className="snap-start h-full">
            <QuickAccess 
              icon={TimerIcon}
              label="Timer"
              href={`/clients/${params.clientId}/timer`}
            />
          </div>

          <div className="snap-start h-full">
            <QuickAccess 
              icon={ChartLineIcon}
              label="Seguimiento"
              href={`/clients/${params.clientId}/timer`}
            />
          </div>

          <div className="snap-start h-full">
            <QuickAccess 
              icon={CalculatorIcon}
              label="Calculadora"
              href={`/clients/${params.clientId}/timer`}
            />
          </div>
          <div className="snap-start h-full">
            <QuickAccess 
              icon={BikeIcon}
              label="Sesión actual"
              href={`/clients/${params.clientId}/timer`}
            />
          </div>
        </div>
      </div>

    </div>
  );
}