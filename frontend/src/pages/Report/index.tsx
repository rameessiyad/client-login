import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

export default function Report() {
    const navigate = useNavigate();
    const { client, logout } = useAuth();

    const handleLogout = async () => {
        await logout(); // clears the cookie on the server and client_auth locally
        navigate("/login", { replace: true });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
            {client && (
                <p className="text-sm text-slate-600">
                    {client.clientName} ({client.clientId})
                </p>
            )}
            <div className="w-40">
                <Button variant="outline" onClick={handleLogout}>Log out</Button>
            </div>
        </div>
    );
}