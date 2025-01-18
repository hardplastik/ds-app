import NavBarHeader from "@/components/ui/nav-bar-header";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="w-full h-dvh min-h-0 flex flex-col overflow-hidden">
      <NavBarHeader title={
        <div className="w-full grid grid-cols-[53px_1fr_53px]">
          <div className="col-span-1"></div>
          <span className="font-medium text-sm leading-4 text-center">Crear Programa</span>
          <div className="col-span-3"></div>
        </div>
      }/>
      {children}
    </section>
  );
}