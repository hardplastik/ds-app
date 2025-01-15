import { JSX } from "react";

export interface NavBarHeaderProps {
  title?: string | JSX.Element
}

export default function NavBarHeader({
  title
}: NavBarHeaderProps) {
  return (
    <div className="px-3 py-2 flex flex-row items-center gap-x-3 bg-slate-800">
        <h1 className="font-thin text-lg text-slate-200">{title ? title : 'Athlos One'}</h1>  
    </div>
  );
}