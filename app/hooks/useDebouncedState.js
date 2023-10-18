import { useState, useEffect } from "react";

function useDebouncedState(initialValue, delay) {
    const [value, setValue] = useState(initialValue);
    const [debouncedValue, setDebouncedValue] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return [debouncedValue, setValue];
}

export default useDebouncedState;
