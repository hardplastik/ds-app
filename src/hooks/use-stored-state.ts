import { useState, useEffect } from "react";

function useStoredState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  
  const getInitialValue = (): T => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const [state, setState] = useState<T>(getInitialValue);

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
