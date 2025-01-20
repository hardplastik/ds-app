export function validValue(value: string): number | undefined {
    
  if (!value) {
    return undefined;
  }
  
  try {
    return parseInt(value);
  } catch {
    return undefined
  }
}
