/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback } from "react";

export function useDebounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction = useCallback((...args: Parameters<T>) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      func(...args);
    }, delay);
  }, [func, delay]);

  return debouncedFunction;
}
