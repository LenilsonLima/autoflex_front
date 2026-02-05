import { useCallback, useState } from "react";

export default function useAsync(fn) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const run = useCallback(async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fn(...args);
            return { ok: true, data };
        } catch (e) {
            setError(e);
            return { ok: false, error: e };
        } finally {
            setLoading(false);
        }
    }, [fn]);

    return { run, loading, error, setError };
}