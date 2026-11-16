import { Navigate, Outlet, useLocation } from "react-router-dom";

const isAuthenticated = () => !!localStorage.getItem("client_auth");

export function ProtectedRoute() {
    const location = useLocation();
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

export function PublicOnlyRoute() {
    return isAuthenticated() ? <Navigate to="/report" replace /> : <Outlet />;
}