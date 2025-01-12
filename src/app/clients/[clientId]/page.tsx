"use client";
import ClientInfo from "@/components/client-info";
import { useAuth } from "@/components/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import NavBarHeader from "@/components/ui/nav-bar-header";
import { getClient } from "@/services/clients";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function ClientPage() {

  const {token} = useAuth();
  const params = useParams<{clientId: string}>();

  const { data: client } = useQuery({
    queryKey: ['clients', params.clientId],
    queryFn: async () => getClient(params.clientId, token)
  });

  return (
    <div className="w-full min-h-dvh bg-slate-200">
      <NavBarHeader title={
        <div className="flex flex-col">
          <span className="font-bold text-lg text-slate-200">{client?.name} {client?.lastName}</span>
          <span className="text-xs text-slate-200">{client?.username}</span>
        </div>
      }/>
      <div className="w-full flex flex-col gap-y-4 items-center p-4">
        <ClientInfo client={client} />
        <Button className="w-full font-extralight">
          <PlusIcon width={32} height={32} className="flex-none" />
          <span>Crear Programa</span>
        </Button>
      </div>
    </div>
  );
}