import { useAuth } from "@/components/contexts/AuthContext";
import { getClientSessions } from "@/services/clients";
import { CurrentProgramSession } from "@/types/UserProgram";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook personalizado para obtener las sesiones de un cliente
 * 
 * @param clientId - ID del cliente
 * @returns Lista de sesiones y estado de la consulta
 */
export function useClientSessions(clientId: string) {
  const { token } = useAuth();

  return useQuery<CurrentProgramSession[]>({
    queryKey: ['client-sessions', clientId],
    queryFn: () => getClientSessions(clientId, token)
  });
} 