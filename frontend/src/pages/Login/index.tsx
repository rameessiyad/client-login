import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../../components/ui/Button";
import FormField from "../../components/ui/FormField";
import LoginBrandPanel from "./LoginBrandPanel";

interface LoginErrors {
    clientId?: string;
    username?: string;
    password?: string;
}

export default function Login() {
    const [clientId, setClientId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginErrors>({});
    const [loading, setLoading] = useState(false);

    // When the app is opened on a client's own subdomain, Client ID is not needed.
    const hasSubdomain = window.location.hostname.split(".").length > 2;

    const validate = (): LoginErrors => {
        const e: LoginErrors = {};
        if (!hasSubdomain && !clientId.trim()) e.clientId = "Enter your client ID.";
        if (!username.trim()) e.username = "Enter your username.";
        if (!password) e.password = "Enter your password.";
        return e;
    };

    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        const found = validate();
        setErrors(found);
        if (Object.keys(found).length) return;

        try {
            setLoading(true);
            // TODO: call your login API here
            // await authService.login({ clientId, username, password });
            await new Promise((r) => setTimeout(r, 800));
        } finally {
            setLoading(false);
        }
    };

    const handleSso = () => {
        // TODO: redirect to company SSO
    };

    return (
        <div className="flex min-h-screen bg-white">
            <LoginBrandPanel />

            <main className="flex flex-1 items-center justify-center px-6 py-10">
                <div className="w-full max-w-[380px]">
                    <h2 className="text-[28px] font-bold text-slate-900">Sign in</h2>
                    <p className="mt-1 text-[15px] text-slate-600">Use your work account to continue.</p>

                    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                        {!hasSubdomain && (
                            <FormField
                                label="Client ID"
                                placeholder="e.g. ACME"
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                                hint="Skipped when you open your company's own web address."
                                error={errors.clientId}
                                autoComplete="organization"
                            />
                        )}

                        <FormField
                            label="Username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={errors.username}
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
                            <div className="mt-1.5 text-right">
                                <a href="/forgot-password" className="text-xs font-medium text-[#20884e] underline hover:text-[#155c36]">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <Button type="submit" loading={loading}>
                            Sign in
                        </Button>
                    </form>

                    <div className="my-5 flex items-center gap-3 text-xs text-slate-500">
                        <span className="h-px flex-1 bg-[#d7dee7]" />
                        or
                        <span className="h-px flex-1 bg-[#d7dee7]" />
                    </div>

                    <Button type="button" variant="outline" onClick={handleSso}>
                        Continue with company SSO
                    </Button>

                    <p className="mt-5 text-center text-xs text-slate-500">
                        A verification code is requested after sign-in if MFA is enabled.
                    </p>
                </div>
            </main>
        </div>
    );
}