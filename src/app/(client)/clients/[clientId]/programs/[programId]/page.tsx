"use client" 

import { useAuth } from "@/components/contexts/AuthContext";
import ProgramWeeksBar from "@/components/domain/program-weeks-bar";
import NavBarHeader from "@/components/ui/nav-bar-header";
import { getClientProgram } from "@/services/client-program-service";
import { SimpleRecord } from "@/types/SimpleRecord";
import { UserProgramExercise, UserProgramSession } from "@/types/UserProgram";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ProgramPage() {

  const router = useRouter();
  const params = useParams<{clientId: string, programId: string}>();
  const {token} = useAuth();

  const [currentWeek, setCurrentWeek] = useState<number>(0);

  const {data: userProgram} = useQuery({
    queryKey: ['client-programs-details', params.clientId, params.programId],
    queryFn: () => getClientProgram(params.programId, token)
  });

  function getProgramWeeks() {
    return userProgram?.sessions
      .map(session => session.weekNumber)
      .filter((value, index, arr) => arr.indexOf(value) === index)
      .map(week => ({
        value: week,
        label: `Semana ${week}`
      } as SimpleRecord))
  }

  return (
    <section className="w-full h-dvh flex flex-col overflow-hidden">
      <NavBarHeader title={
              <div className="w-full grid grid-cols-[53px_1fr_53px]">
                <button className="font-bold text-xs" onClick={() => router.replace(`/clients/${params.clientId}`)}>Regresar</button>
                <span className="font-medium text-sm leading-4 text-center">{userProgram?.name}</span>
                <div className="col-span-3"></div>
              </div>
            }/>
      <div className="w-full flex-grow flex flex-col overflow-auto border p-4">
          <ProgramWeeksBar value={currentWeek} options={getProgramWeeks()} onSelect={(value) => setCurrentWeek(value as number)} />
          {
            userProgram?.sessions
              .sort((a, b) => a.weekNumber - b.weekNumber)
              .filter(s => s.weekNumber - 1 == currentWeek)
              .sort((a, b) => a.weekDay - b.weekDay)
              .map(session => (
                <UserSessionCard key={session.id} session={session}/>
              ))
          }
      </div>
    </section>
  );
}

export interface UserSessionProps {
  session: UserProgramSession
}

export function UserSessionCard({session}: UserSessionProps) {
  return (
    <div  className="bg-slate-300 rounded-md p-3">
      <span className="font-medium text-xs leading-[14px] text-slate-800">Sesión {session.weekDay}</span>
      <div>
        {
          session.exercises
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .map(exercise => (
              <UserExerciseCard key={exercise.id} exercise={exercise} />
            ))
        }
      </div>
    </div>
  )
}

export interface UserExerciseCardProps {
  exercise: UserProgramExercise
}

export function UserExerciseCard({exercise}: UserExerciseCardProps) {
  return (
    <div>
     {exercise.orderNumber} {exercise.name}
    </div>
  )
}