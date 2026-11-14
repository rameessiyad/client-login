import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function Report() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
            <div className="w-40">
                <Button variant="outline" onClick={logout}>Log out</Button>
            </div>
        </div>
    );
}