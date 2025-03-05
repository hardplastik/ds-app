import Footer from "@/components/ui/layout/authenticated/footer";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="w-dvw h-dvh flex flex-col">
      <div className="flex-grow w-full flex flex-col min-h-0 overflow-hidden">{children}</div>
      <Footer />
    </section>
  );
}