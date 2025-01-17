import { JSX } from "react";

export interface NavBarHeaderProps {
  title?: string | JSX.Element
}

export default function NavBarHeader({
  title
}: NavBarHeaderProps) {
  return (
    <div className="px-3 py-2 flex-none flex flex-row items-center gap-x-3 text-white bg-slate-800">
        {title} 
    </div>
  );
}