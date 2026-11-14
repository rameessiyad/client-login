import { Navigate, Outlet, useLocation } from "react-router-dom";

// Replace with your real auth check (context / store)
const isAuthenticated = () => !!localStorage.getItem("token");

export function ProtectedRoute() {
    const location = useLocation();
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

export function PublicOnlyRoute() {
    return isAuthenticated() ? <Navigate to="/report" replace /> : <Outlet />;
}