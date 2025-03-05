/**
 * Interfaz que representa la sesión actual del usuario
 */
export interface UserCurrentSession {
  /** Nombre del programa actual */
  programName: string;
  /** Objetivo principal del programa */
  objective: string;
  /** Fase del programa */
  phase: string;
  /** Nivel de actividad */
  activityLevel: string;
  /** Volumen de entrenamiento */
  volume: string;
  /** Rango de repeticiones */
  reps: string;
  /** RIR objetivo */
  rir: string;
  /** Duración estimada */
  duration: string;
} 