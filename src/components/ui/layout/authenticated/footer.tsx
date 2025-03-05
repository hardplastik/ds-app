import { AppleIcon, CalendarIcon, ClipboardPenIcon, DumbbellIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex-none w-full bg-blue-950 flex flex-row gap-x-4 pt-2">
      <FooterButton 
        icon={<DumbbellIcon width={16} height={16} className="text-white" strokeWidth={3}/>} 
        label={<span className="text-sm font-bold">Ejercicio</span>} href="/"  />
      <FooterButton 
        icon={<AppleIcon width={16} height={16} strokeWidth={1.5}/>} 
        label={<span className="text-sm ">Nutrición</span>} href="/" />
      <FooterButton 
        icon={<ClipboardPenIcon width={16} height={16} strokeWidth={1.5}/>} 
        label={<span className="text-sm ">Fisioterapia</span>} href="/" />
      <FooterButton 
        icon={<CalendarIcon width={16} height={16} strokeWidth={1.5}/>} 
        label={<span className="text-sm ">Agenda</span>} href="/" />
    </div>
  );
}

export interface FooterButtonProps {
  icon: React.ReactNode;
  label: React.ReactNode;
  href: string;
}

export function FooterButton({icon, label, href}: FooterButtonProps) {
  return (
    <Link href={href} prefetch={false} className="w-full flex flex-col items-center justify-center gap-y-2 p-2 text-white">
      {icon}
      {label}
    </Link>
  );
}