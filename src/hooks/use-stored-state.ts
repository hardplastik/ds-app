import { useState, useEffect } from "react";

function useStoredState<T>(key: string, defaultValue: T | null = null): [T | null, React.Dispatch<React.SetStateAction<T | null>>] {
  
  const getInitialValue = (): T | null => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const [state, setState] = useState<T | null>(getInitialValue);

  useEffect(() => {
    if (state === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        const newValue = event.newValue ? JSON.parse(event.newValue) : null;
        setState(newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [state, setState];
}

export default useStoredState;
