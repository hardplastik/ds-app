import { useAuth } from "@/components/contexts/AuthContext";
import { getClientCurrentSession } from "@/services/clients";
import { CurrentProgramSession } from "@/types/UserProgram";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook personalizado para obtener la sesión actual del programa de un cliente
 * 
 * @param clientId - ID del cliente
 * @returns Datos de la sesión actual y estado de la consulta
 */
export function useCurrentProgramSession(clientId: string) {
  const { token } = useAuth();

  return useQuery<CurrentProgramSession>({
    queryKey: ['client-current-session', clientId],
    queryFn: () => getClientCurrentSession(clientId, token)
  });
} 