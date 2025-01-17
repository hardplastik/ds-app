import { Exercise } from "@/types/Exercise";

export async function listExercises(token: string | null): Promise<Exercise[]> {

  if (!token) {
    throw new Error('Waiting on token');
  }
  const response: Exercise[] = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercises`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        } )).json()
  return response;
}