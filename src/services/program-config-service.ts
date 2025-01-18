import { ProgramSeed } from "@/components/domain/program-form";
import { ConfigProgram, ConfigSession, ConfigWeek } from "@/types/ProgramConfig";

export function buildProgramSchema(program: ProgramSeed): ConfigProgram {

  const configProgram: ConfigProgram = {
    name: program.name,
    weeks: []
  };

  for(let i = 0; i < program.weeks; i++) {

    const week: ConfigWeek = {
      weekNumber: i + 1,
      sessions: []
    };

    configProgram.weeks.push(week);

    for (let j = 0; j < program.sessionPerWeek; j++){
    
      const session:ConfigSession = {
        weekNumber: week.weekNumber,
        weekDay: j + 1,
        exercises: []
      }
      week.sessions.push(session);
    }

  }

  return configProgram;
}