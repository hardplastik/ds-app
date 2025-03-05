import { Exercise } from "./Exercise";
import { ConfigSet } from "./ProgramConfig";
import { User } from "./User";

export interface UserProgram {
  id: string;
  name: string;
  user: User;
  enrollDatetime: string;
  isStarted: boolean;
  isCompleted: boolean;
  weeks: number;
  sessionsPerWeek: number;
  phase: string;
  goal: string;
  methodology: string;
  intensity: string;
  highSeries: number;
  lowSeries: number;
  minReps: number;
  maxReps: number;
  rirMin: number;
  rirMax: number;
  sessions?: UserProgramSession[]
}

export interface UserProgramSession {
  id: string;
  weekNumber: number;
  weekDay: number;
  startDatetime?: string;
  endDatetime?: string;
  isCompleted: boolean;
  exercises: UserProgramExercise[]
}

export interface UserCurrentSession extends UserProgramSession {
  program: UserProgram;
}

export interface UserProgramExercise extends Exercise {
  orderNumber: number;
  isCompleted: number;
  notes?: string;
  sets: UserProgramSet[]
}

export interface UserProgramSet extends ConfigSet {
  id: string;
  reps?: number;
  weight?: number;
  isCompleted: boolean
}