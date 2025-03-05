'use client'

import { LucideIcon } from "lucide-react";
import Link from "next/link";


interface QuickAccessProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

/**
 * Componente de acceso rápido que muestra una herramienta o funcionalidad
 * con un ícono y etiqueta. Diseñado para ser usado en listas horizontales
 * con scroll suave.
 * 
 * @param icon - Ícono de Lucide a mostrar {@link https://lucide.dev/icons/ LucideIcon}
 * @param label - Texto descriptivo de la funcionalidad (string)
 * @param href - URL de destino al hacer clic (string)
 */
export default function QuickAccess({ icon: Icon, label, href }: QuickAccessProps) {
  return (
    <Link href={href} prefetch={false} className="flex-none w-[136px] h-full flex flex-col gap-y-4 items-center justify-center shadow-around rounded-lg p-6">
      <Icon className="size-9 text-slate-900" strokeWidth={1} />
      <span className="font-light text-base text-slate-900 text-center">{label}</span>
    </Link>
  );
} 