import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) =>{
    setValue((prev) =>{
        const valueToStore = typeof newValue === "function" ? newValue(prev) : newValue; 

        localStorage.setItem(key,JSON.stringify(valueToStore))
        return valueToStore
    })
  }

  return [value,setStoredValue]; 
};
