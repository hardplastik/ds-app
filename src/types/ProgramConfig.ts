export enum WeightUnits {
  KILO = "K",
  LIBRA = "L"
}

export interface ConfigProgram {
  accountId: string;
  name: string;
  sessions: ConfigSession[];
}

export interface ConfigSession {
  weekDay: number;
  weekNumber: number;
  exercises: ConfigExercise[];
}

export interface ConfigExercise {
  id: string;
  name: string;
  orderNumber: number;
  notes: string;
  sets: ConfigSet[];
}

export interface ConfigSet {
  targetReps?: number;
  targetWeight?: number;
  rpe?: number;
  unit?: string;
  orderNumber: number;
}
