import { CompleteExerciseSet } from "@/components/domain/user-session-card";
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

export async function completeExercise(setId: string, command: CompleteExerciseSet, token: string | null): Promise<void> {

  if (!token) {
    throw new Error('Waiting on token');
  }

  await (await fetch (`${process.env.NEXT_PUBLIC_API_URL}/program-session-exercise-set/${setId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(command)
  }))

}