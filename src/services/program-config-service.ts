import { ProgramSeed } from "@/components/domain/program-form";
import { ConfigProgram, ConfigSession } from "@/types/ProgramConfig";

export function buildProgramSchema(program: ProgramSeed, accountId: string): ConfigProgram {
  
  const configProgram: ConfigProgram = {
    accountId: accountId,
    name: program.name,
    sessions: []
  };

  for (let i = 0; i < program.weeks; i++) {
    for (let j = 0; j < program.sessionPerWeek; j++) {
      
      const session: ConfigSession = {
        weekNumber: i + 1,
        weekDay: j + 1,
        exercises: []
      };

      configProgram.sessions.push(session);
    }
  }

  return configProgram;
}


export async function saveProgramUser(configProgram: ConfigProgram, token: string | null) {
  
  if (!token) {
    throw new Error('Waiting on token');
  }

  console.log(configProgram)

  const response = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(configProgram)
  }))

  console.log(response)

}