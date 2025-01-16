"use client";
import ClientInfo from "@/components/client-info";
import { useAuth } from "@/components/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import NavBarHeader from "@/components/ui/nav-bar-header";
import UserProgramCard from "@/components/ui/user-program-card";
import { getClient, getClientPrograms } from "@/services/clients";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ClientPage() {

  const {token} = useAuth();
  const params = useParams<{clientId: string}>();

  const { data: client } = useQuery({
    queryKey: ['clients', params.clientId],
    queryFn: () => getClient(params.clientId, token)
  });

  const {data: programs} = useQuery({
    queryKey: ['client-programs', params.clientId],
    queryFn: () => getClientPrograms(params.clientId, token)
  });

  return (
    <div className="w-full h-dvh bg-slate-200 flex flex-col">
      <NavBarHeader title={
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-200">{client?.name} {client?.lastName}</span>
            <span className="text-xs text-slate-200">{client?.username}</span>
          </div>
        }/>

      <div className="w-full h-full flex-grow flex flex-col justify-between overflow-hidden">

        <div className="w-full h-full flex-grow flex flex-col gap-y-4 items-center pt-4 px-4 overflow-hidden">
          <ClientInfo client={client} />
          <h2 className="w-full text-4xl font-bold text-slate-800 text-left">Programas</h2>
          <div className="w-full space-y-2 h-full flex-grow overflow-auto pb-4">
            {
              programs?.map(program => (<UserProgramCard key={program.id} program={program} />))
            }
          </div>
        </div>

        <div className="pb-4 px-4 flex-none">
          <Link href="/programs/add" className="w-full">
              <Button className="w-full font-extralight">
                <PlusIcon width={32} height={32} className="flex-none" />
                <span>Crear Programa</span>
              </Button>
          </Link>
        </div>
      </div>
    

    </div>
  );
}