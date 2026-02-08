import { useState } from "react";
import { AuthContext } from "./auth.context";
import { login as loginService } from "./auth.service";
import { loadAuth, saveAuth, clearAuth } from "./auth.storage";
import type { LoginResponse, LoginUser } from "./auth.types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const storedAuth = loadAuth();

    const [user, setUser] = useState<LoginUser | null>(
        storedAuth?.user ?? null
    );
    const [accessToken, setAccessToken] = useState<string | null>(
        storedAuth?.access ?? null
    );


    async function login(username: string, password: string) {
        const data: LoginResponse = await loginService({ username, password });

        setUser(data.user);
        setAccessToken(data.access);
        saveAuth(data);
    }

    function logout() {
        setUser(null);
        setAccessToken(null);
        clearAuth();
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                login,
                logout,
            }}
            >
            {children}
            </AuthContext.Provider>
    );
}
