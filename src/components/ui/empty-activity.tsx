'use client'

import { ClipboardXIcon } from "lucide-react";

/**
 * Componente que muestra un estado vacío para la sección de actividad
 * con un ícono y mensaje personalizable.
 * 
 * @param message - Mensaje a mostrar cuando no hay actividad (string)
 */
export default function EmptyActivity({ message = "No hay actividad reciente" }: { message?: string }) {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center rounded-lg bg-white py-16 px-20 text-center border border-slate-200">
      <ClipboardXIcon size={96} className="text-slate-300" />
      <p className="font-bold text-2xl text-slate-400">{message}</p>
    </div>
  );
} 