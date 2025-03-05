import { useAuth } from "@/components/contexts/AuthContext";
import { getClient } from "@/services/clients";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook personalizado para obtener los datos de un cliente
 * 
 * @param clientId - ID del cliente
 * @returns Datos del cliente y estado de la consulta
 */
export function useClient(clientId: string) {
  const { token } = useAuth();

  return useQuery<User>({
    queryKey: ['clients', clientId],
    queryFn: () => getClient(clientId, token)
  });
} 