export function formatDuration(seconds: number): string {
  const totalMinutes = Math.floor(seconds / 60);
  return `${totalMinutes} mins`;
} 