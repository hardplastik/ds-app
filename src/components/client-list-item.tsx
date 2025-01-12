import { User } from "@/types/User";
import { Avatar, AvatarFallback } from "./ui/avatar";

export interface ClientListItemProps {
  client: User
}

export default function ClientListItem({client}: ClientListItemProps) {
  return (
    <button
        key={client.id}
        className="w-full shadow-md shadow-black bg-slate-800 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-800/70 transition-colors text-left"
      >
        <Avatar className={`h-12 w-12`}>
          <AvatarFallback className="font-bold text-base text-white bg-primary">
            <span className="text-slate-800">{client.name[0]}{client.lastName[0]}</span>
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-bold text-lg">{client.name} {client.lastName}</div>
          <div className="font-extralight text-sm">{client.username}</div>
        </div>
    </button>
  )


}