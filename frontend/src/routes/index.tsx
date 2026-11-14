import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute, PublicOnlyRoute } from "./ProtectedRoute";

const Login = lazy(() => import("../pages/Login"));
const Report = lazy(() => import("../pages/Report"));
const Settings = lazy(() => import("../pages/Settings"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/report" replace /> },
    {
        element: <PublicOnlyRoute />,
        children: [{ path: "/login", element: <Login /> }],
    },
    {
        element: <ProtectedRoute />,
        children: [
            { path: "/report", element: <Report /> },
            { path: "/settings", element: <Settings /> },
        ],
    },
    { path: "*", element: <NotFound /> },
]);