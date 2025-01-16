import { User } from "@/types/User";
import { UserProgram } from "@/types/UserProgram";

export async function getClient(clientId: string, token: string | null): Promise<User> {

  if (!token) {
    throw new Error('Waiting on token');
  }
  const response: User = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        } )).json()
  return response;
}

export async function getClientPrograms(clientId: string, token: string | null): Promise<UserProgram[]> {

  if (!token) {
    throw new Error('Waiting on token');
  }
  const response: UserProgram[] = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientId}/programs`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        } )).json()

  return response;
}