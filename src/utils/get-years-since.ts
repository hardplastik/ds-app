import { differenceInYears } from 'date-fns';

export function getYearsSince(date?: string): number | null {

  if (!date) {
    return null;
  }

  const currentDate = new Date();
  return differenceInYears(currentDate, new Date(date));
}