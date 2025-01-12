export interface User {
  id: string
  username: string
  name: string
  weight?: number;
  height?: number;
  dayOfBirth?: string;
  phoneNumber?: number;
  lastName: string
  isTrainer: boolean
  authorities: string[]
}