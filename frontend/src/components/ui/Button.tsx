import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline";
    loading?: boolean;
    children: ReactNode;
}

const base =
    "flex h-12 w-full items-center justify-center gap-2 rounded-lg text-[15px] font-semibold " +
    "transition outline-none focus-visible:ring-2 focus-visible:ring-[#9fdfbc] focus-visible:ring-offset-2 " +
    "disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
    primary: "bg-[#20884e] text-white hover:bg-[#1a7041] active:bg-[#155c36]",
    outline: "border border-[#d7dee7] bg-white text-slate-800 hover:border-[#20884e] hover:bg-[#f2faf5]",
};

export default function Button({
    variant = "primary",
    loading = false,
    disabled,
    children,
    className = "",
    ...rest
}: ButtonProps) {
    return (
        <button className={`${base} ${variants[variant]} ${className}`} disabled={disabled || loading} {...rest}>
            {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
            )}
            {children}
        </button>
    );
}