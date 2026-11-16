import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../../components/ui/Button";
import FormField from "../../components/ui/FormField";
import LoginBrandPanel from "./LoginBrandPanel";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface LoginErrors {
    clientId?: string;
    password?: string;
}

export default function Login() {
    const { clientLogin, loading } = useAuth();

    const [clientId, setClientId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginErrors>({});
    const [formError, setFormError] = useState("");

    const navigate = useNavigate();

    const validate = (): LoginErrors => {
        const e: LoginErrors = {};
        if (!clientId.trim()) e.clientId = "Enter your client ID.";
        if (!password) e.password = "Enter your password.";
        return e;
    };

    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        setFormError("");

        const found = validate();
        setErrors(found);
        if (Object.keys(found).length) return;

        const result = await clientLogin(clientId, password);

        if (!result.ok) {
            setFormError(result.message);
            return;
        }

        if (!result.ok) {
            setFormError(result.message);
            return;
        }

        navigate("/report", { replace: true });
    };

    return (
        <div className="flex min-h-screen bg-white">
            <LoginBrandPanel />

            <main className="flex flex-1 items-center justify-center px-6 py-10">
                <div className="w-full max-w-95">
                    <h2 className="text-[28px] font-bold text-slate-900">Sign in</h2>
                    <p className="mt-1 text-[15px] text-slate-600">Use your client account to continue.</p>

                    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                        {formError && (
                            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                                {formError}
                            </p>
                        )}

                        <FormField
                            label="Client ID"
                            placeholder="e.g. C01"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            error={errors.clientId}
                            autoComplete="username"
                        />

                        <div>
                            <FormField
                                label="Password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                                autoComplete="current-password"
                            />
                            {/* <div className="mt-1.5 text-right">
                                <a href="/forgot-password" className="text-xs font-medium text-[#20884e] underline hover:text-[#155c36]">
                                    Forgot password?
                                </a>
                            </div> */}
                        </div>

                        <Button type="submit" loading={loading}>
                            Sign in
                        </Button>
                    </form>

                    {/* <div className="my-5 flex items-center gap-3 text-xs text-slate-500">
                        <span className="h-px flex-1 bg-[#d7dee7]" />
                        or
                        <span className="h-px flex-1 bg-[#d7dee7]" />
                    </div> */}

                    {/* <Button type="button" variant="outline" onClick={handleSso}>
                        Continue with company SSO
                    </Button> */}
                </div>
            </main>
        </div>
    );
}