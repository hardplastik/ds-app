import { User } from "@/types/User";

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