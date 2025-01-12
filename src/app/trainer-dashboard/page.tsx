import { WelcomeTrainerCard } from "@/components/welcom-trainer-card";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <WelcomeTrainerCard options={[{
        href: '/clients',
        label: 'Clientes'
      }, {
        href: '/',
        label: 'Mis entrenamientos'
      }]}/>
    </div>
  );
}