"use client" 

import { useAuth } from "@/components/contexts/AuthContext";
import ProgramWeeksBar from "@/components/domain/program-weeks-bar";
import { UserSessionCard } from "@/components/domain/user-session-card";
import NavBarHeader from "@/components/ui/nav-bar-header";
import { getClientProgram } from "@/services/client-program-service";
import { SimpleRecord } from "@/types/SimpleRecord";
import { UserProgram } from "@/types/UserProgram";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProgramPage() {

  const router = useRouter();
  const params = useParams<{clientId: string, programId: string}>();
  const {token} = useAuth();

  const [userProgram, setUserProgram] = useState<UserProgram>();

  const [currentWeek, setCurrentWeek] = useState<number>(0);

  const {data: userProgramData} = useQuery({
    queryKey: ['client-programs-details', params.clientId, params.programId],
    queryFn: () => getClientProgram(params.programId, token)
  });

  useEffect(() => {

    if (userProgramData) {
      setUserProgram({...userProgramData});
    }

  }, [userProgramData]);

  function getProgramWeeks() {
    return userProgram?.sessions
      .map(session => session.weekNumber)
      .filter((value, index, arr) => arr.indexOf(value) === index)
      .map(week => ({
        value: week,
        label: `Semana ${week}`
      } as SimpleRecord))
  }

  function onUpdate() {
    if (userProgram) {
      setUserProgram(JSON.parse(JSON.stringify(userProgram)));
    }
  }

  return (
    <section className="w-full h-dvh grid grid-rows-[48px_1fr] overflow-hidden">
      <NavBarHeader title={
              <div className="w-full grid grid-cols-[53px_1fr_53px]">
                <button className="font-bold text-xs" onClick={() => router.replace(`/clients/${params.clientId}`)}>Regresar</button>
                <span className="font-medium text-sm leading-4 text-center">{userProgram?.name}</span>
                <div className="col-span-3"></div>
              </div>
            }/>
      <div className="w-full flex-grow flex flex-col overflow-auto border p-4 gap-y-2">
          <ProgramWeeksBar value={currentWeek} options={getProgramWeeks()} onSelect={(value) => setCurrentWeek(value as number)} />
          {
            userProgram?.sessions
              .sort((a, b) => a.weekNumber - b.weekNumber)
              .filter(s => s.weekNumber - 1 == currentWeek)
              .map(session => (
                <UserSessionCard key={session.id} session={session} onUpdate={onUpdate}/>
              ))
          }
      </div>
    </section>
  );
}
