import NavBarHeader from "@/components/ui/nav-bar-header";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="w-full min-h-dvh flex flex-col">
      <NavBarHeader title={
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-200">Crear programa</span>
            </div>
          }/>
      {children}
    </section>
  );
}