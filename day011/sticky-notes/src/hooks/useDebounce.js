import { useState, useEffect } from 'react'

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set debouncedValue to value (passed in) after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Return a cleanup function that will be called every time ...
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce