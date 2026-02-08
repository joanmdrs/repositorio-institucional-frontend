import { createContext } from "react";
import type { LoginUser } from "./auth.types";

export interface AuthContextData {
    user: LoginUser | null;
    accessToken: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

