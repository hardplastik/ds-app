"use client";

import ClientListItem from "@/components/client-list-item";
import { useAuth } from "@/components/contexts/AuthContext";
import NavBarHeader from "@/components/ui/nav-bar-header";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

export default function ClientsListPage() {

  const {token} = useAuth();

  const {data: clients} = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response: User[] = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } )).json()
      return response;
    }
  })

  return (
    <div className="w-full min-h-dvh bg-slate-200">
      <NavBarHeader title="Clientes"/>
      <div className="flex flex-col gap-y-4 p-4">
        {clients?.map((client) => (
          <ClientListItem key={client.id} client={client}/>  
        ))}
      </div>
    </div>
  );
}