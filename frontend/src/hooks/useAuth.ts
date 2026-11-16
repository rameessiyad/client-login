import { useCallback, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
const AUTH_URL = `${API_URL}/api/auth`; // matches router.use("/api/auth", authRoute)
const STORAGE_KEY = "client_auth";

export interface ClientInfo {
    clientId: string;
    clientName: string;
    customerId: string;
}

export interface LoginResult {
    ok: boolean;
    message: string;
}

const readStored = (): ClientInfo | null => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as ClientInfo) : null;
    } catch {
        return null;
    }
};

export function useAuth() {
    const [client, setClient] = useState<ClientInfo | null>(readStored);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clientLogin = useCallback(
        async (clientId: string, password: string): Promise<LoginResult> => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${AUTH_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include", // needed for the httpOnly cookie
                    body: JSON.stringify({ clientId: clientId.trim(), password }),
                });
                const json = await res.json();

                if (!res.ok || !json.success) {
                    const message = json.message ?? "Client login failed";
                    setError(message);
                    return { ok: false, message };
                }

                localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
                setClient(json.data);
                return { ok: true, message: json.message };
            } catch {
                const message = "Unable to reach the server";
                setError(message);
                return { ok: false, message };
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    const logout = useCallback(async () => {
        try {
            await fetch(`${AUTH_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch {
            /* clear local state even if the request fails */
        }
        localStorage.removeItem(STORAGE_KEY);
        setClient(null);
    }, []);

    return {
        client,
        isClientLoggedIn: !!client,
        loading,
        error,
        clientLogin,
        logout,
    };
}