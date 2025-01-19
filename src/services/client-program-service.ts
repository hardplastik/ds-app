import { UserProgram } from "@/types/UserProgram";

export async function getClientProgram(programId: string, token: string | null): Promise<UserProgram> {

    if (!token) {
      throw new Error('Waiting on token');
    }
    
    const response: UserProgram = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs/${programId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    } )).json()

    return response;
}