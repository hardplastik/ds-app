import { User } from "./User";

export interface UserProgram {
  name: string;
  id: string;
  enrollDatetime: string;
  isStarted: boolean;
  user: User;
  weeks: number;
  sessionsPerWeek: number;
}