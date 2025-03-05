import { User } from "@/types/User";
import { UserCurrentSession, UserProgram } from "@/types/UserProgram";

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

export async function getClientCurrentSession(clientId: string, token: string | null): Promise<UserCurrentSession> {

  if (!token) {
    throw new Error('Waiting on token');
  }
  const response = (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientId}/current-session`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }));

  if (!response.ok) {
    throw new Error('Failed to fetch current session');
  }

  return response.json();
}


export async function getClientSessions(clientId: string, token: string | null): Promise<UserCurrentSession[]> {

  if (!token) {
    throw new Error('Waiting on token');
  }
  const response = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientId}/recent-sessions`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }));

  if (!response.ok) {
    throw new Error('Failed to fetch sessions');
  }
  
  return response.json();
}   