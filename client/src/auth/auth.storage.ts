import type { LoginResponse } from "./auth.types";

const STORAGE_KEY = "auth";

export function saveAuth(data: LoginResponse) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadAuth(): LoginResponse | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
}

export function clearAuth() {
    localStorage.removeItem(STORAGE_KEY);
}
