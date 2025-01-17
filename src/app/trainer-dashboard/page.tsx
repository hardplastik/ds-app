"use client";

import { useAuth } from "@/components/contexts/AuthContext";
import { WelcomeTrainerCard } from "@/components/welcom-trainer-card";

export default function Page() {

  const { user } =  useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <WelcomeTrainerCard options={[{
        href: '/clients',
        label: 'Clientes'
      }, {
        href: `/clients/${user?.id}`,
        label: 'Mis entrenamientos'
      }]}/>
    </div>
  );
}