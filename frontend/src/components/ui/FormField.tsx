import { forwardRef, useId, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hint?: string;
    error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, hint, error, type = "text", className = "", ...rest }, ref) => {
        const id = useId();
        const [visible, setVisible] = useState(false);
        const isPassword = type === "password";
        const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

        return (
            <div className="w-full">
                <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-900">
                    {label}
                </label>

                <div className="relative">
                    <input
                        id={id}
                        ref={ref}
                        type={isPassword && visible ? "text" : type}
                        aria-invalid={!!error}
                        aria-describedby={describedBy}
                        className={`h-12 w-full rounded-lg border bg-white px-4 text-[15px] text-slate-700
              placeholder:text-slate-400 outline-none transition
              focus:border-[#9fdfbc] focus:ring-2 focus:ring-[#9fdfbc]
              ${isPassword ? "pr-12" : ""}
              ${error ? "border-red-400" : "border-[#d7dee7]"} ${className}`}
                        {...rest}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setVisible((v) => !v)}
                            aria-label={visible ? "Hide password" : "Show password"}
                            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center
                text-slate-400 hover:text-[#20884e] focus-visible:text-[#20884e] outline-none"
                        >
                            {visible ? <FiEyeOff size={20} aria-hidden /> : <FiEye size={20} aria-hidden />}
                        </button>
                    )}
                </div>

                {error ? (
                    <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-600">{error}</p>
                ) : hint ? (
                    <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">{hint}</p>
                ) : null}
            </div>
        );
    }
);

FormField.displayName = "FormField";
export default FormField;