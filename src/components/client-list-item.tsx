import { User } from "@/types/User";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";

export interface ClientListItemProps {
  client: User
}

export default function ClientListItem({client}: ClientListItemProps) {
  return (
    <Link href={`/clients/${client.id}`}
        key={client.id}
        className="w-full shadow-sm shadow-slate-400 bg-slate-100 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-800/70 transition-colors text-left"
      >
        <Avatar className={`h-12 w-12`}>
          <AvatarFallback className="font-bold text-base text-white bg-primary">
            <span className="text-slate-800">{client.name[0]}{client.lastName[0]}</span>
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-bold text-lg text-slate-800">{client.name} {client.lastName}</div>
          <div className="font-extralight text-sm text-slate-600">{client.username}</div>
        </div>
    </Link>
  )


}