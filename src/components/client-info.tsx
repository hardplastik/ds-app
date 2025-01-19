import { User } from "@/types/User";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Label } from "./ui/label";
import { getYearsSince } from "@/utils/get-years-since";

export interface ClientInfoProps {
  client?: User
}

export default function ClientInfo({client}: ClientInfoProps) {

  if (!client) {
    return null;
  }
  
  return (
    <Card className="w-full bg-slate-100 border border-slate-800 shadow-none border-none">
        <CardHeader className="flex flex-row gap-x-4 items-center">
          <Avatar className={`h-12 w-12`}>
            <AvatarFallback className="font-bold text-base text-white bg-primary">
              <span className="text-slate-800">{client?.name[0]}{client?.lastName[0]}</span>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label className="font-bold text-xl text-slate-800">{client?.name} {client?.lastName}</Label>
            <span className="font-light text-sm text-slate-600">{client?.username}</span>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-3">
          <ClientDetail label="Peso (kgs)" value={client.weight || 'N/A'}/>
          <ClientDetail label="Estatura (mts)" value={client.height || 'N/A'}/>
          <ClientDetail label="Edad (años)" value={getYearsSince(client.dayOfBirth) || 'N/A'}/>
        </CardContent>
      </Card>
  );
}

export interface ClientDetailProps {
  label: string;
  value: string | number;
}

export function ClientDetail({
  label,
  value
}: ClientDetailProps) {
  return (
    <div className="flex flex-col">
        <Label className="font-bold text-2xl text-slate-800 text-center">{value}</Label>
        <Label className="font-light text-xs text-slate-600 text-center">{label}</Label>
      </div>
  )
}