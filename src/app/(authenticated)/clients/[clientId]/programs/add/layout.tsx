"use client";
import NavBarHeader from "@/components/ui/nav-bar-header";
import { useRouter } from "next/navigation";

export default function Layout({children}: {children: React.ReactNode}) {

  const router = useRouter();

  return (
    <section className="w-full h-dvh min-h-0 flex flex-col overflow-hidden">
      <NavBarHeader title={
        <div className="w-full grid grid-cols-[53px_1fr_53px]">
          <button className="font-bold text-xs" onClick={() => router.back()}>Cancelar</button>
          <span className="font-medium text-sm leading-4 text-center">Crear Programa</span>
          <div className="col-span-3"></div>
        </div>
      }/>
      {children}
    </section>
  );
}