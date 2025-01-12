"use client";

import ClientListItem from "@/components/client-list-item";
import { useAuth } from "@/components/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Clientes</h1>
        <Button variant="ghost" size="icon" className="text-slate-900">
          <PlusIcon className="h-6 w-6" />
        </Button>
      </div>

      <div className="space-y-3">
        {clients?.map((client) => (
          <ClientListItem key={client.id} client={client}/>  
        ))}
      </div>
    </div>
  );
}