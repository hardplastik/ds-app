export interface Exercise {
  id: string;
  name: string;
  description: string;
  groups: ExerciseGroup[]
}

export interface ExerciseGroup {
  id: string;
  name: string;
  isPrincipal: boolean;
}