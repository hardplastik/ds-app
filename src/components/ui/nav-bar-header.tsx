import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

export interface NavBarHeaderProps {
  title?: string | JSX.Element
}

export default function NavBarHeader({
  title
}: NavBarHeaderProps) {
  return (
    <div className="px-3 py-2 flex flex-row items-center gap-x-3 bg-slate-800">
        <Link href="/clients">
          <ChevronLeftIcon width={24} height={24} className="text-slate-50"/>
        </Link>
        <h1 className="font-thin text-lg text-slate-200">{title ? title : 'Athlos One'}</h1>
      </div>
  );
}