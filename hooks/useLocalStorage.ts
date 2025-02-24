import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {

    if (typeof window === "undefined") {
        return [null as any, () => { }]
    }

    // State to store the value in React's state
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.error(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T) => {
        try {
            // Allow value to be a function, so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.error(error);
        }
    };

    useEffect(() => {
        // This effect ensures that changes in local storage from other tabs are reflected.
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key) {
                try {
                    setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
                } catch (e) {
                    console.error("Error parsing value from localStorage:", e);
                }
            }
        };

        // Add event listener for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, initialValue]); // Only re-run the effect if key or initialValue changes

    return [storedValue, setValue];
}

export default useLocalStorage;