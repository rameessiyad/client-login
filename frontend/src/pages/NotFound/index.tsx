import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
            <Link to="/" className="text-sm font-medium text-[#20884e] underline">Go to home</Link>
        </div>
    );
}