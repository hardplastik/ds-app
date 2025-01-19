import { Exercise } from "./Exercise";
import { ConfigSet } from "./ProgramConfig";
import { User } from "./User";

export interface UserProgram {
  id: string;
  name: string;
  enrollDatetime: string;
  isStarted: boolean;
  isCompleted: boolean;
  user: User;
  weeks: number;
  sessionsPerWeek: number;
  sessions: UserProgramSession[]
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

export interface UserProgramExercise extends Exercise {
  orderNumber: number;
  isCompleted: number;
  notes?: string;
  sets: UserProgramSet[]
}

export interface UserProgramSet extends ConfigSet {
  id: string;
  resp?: number;
  weight?: number;
  isCompleted: boolean
}