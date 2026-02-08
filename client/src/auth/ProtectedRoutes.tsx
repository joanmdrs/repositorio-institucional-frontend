import { Navigate } from "react-router-dom";
import { useAuth } from "./auth.hook";
import { UserGroup } from "./groups";
import type { JSX } from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedGroups: UserGroup[];
}

export default function ProtectedRoute({
    children,
    allowedGroups,
}: ProtectedRouteProps) {
    const { user } = useAuth();

    // não logado
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // sem grupo permitido

    const hasPermission = user.groups.some((groupName) =>
        allowedGroups.includes(groupName as UserGroup)
    );

    if (!hasPermission) {
        return <Navigate to="/403" replace />;
    }

    return children;
}
