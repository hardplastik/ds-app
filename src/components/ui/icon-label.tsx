'use client'

import { LucideIcon } from "lucide-react";

/**
 * Componente que muestra un ícono con su etiqueta asociada.
 * 
 * @param icon - Ícono de Lucide a mostrar {@link https://lucide.dev/icons/ LucideIcon}
 * @param label - Texto a mostrar junto al ícono (string)
 * @param iconSize - Tamaño del ícono en píxeles (number)
 * @param className - Clases adicionales para el contenedor (string)
 */
export default function IconLabel({ 
  icon: Icon, 
  label, 
  iconSize = 12,
  className = ""
}: { 
  icon: LucideIcon;
  label: string;
  iconSize?: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-row gap-x-1 items-center ${className}`}>
      <Icon size={iconSize} className="text-white" />
      <span className="font-normal text-xs text-white">{label}</span>
    </div>
  );
} 