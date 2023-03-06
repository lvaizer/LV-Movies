import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export default function useSearchDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useSearchParams(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            value && setDebouncedValue('query=' + value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
