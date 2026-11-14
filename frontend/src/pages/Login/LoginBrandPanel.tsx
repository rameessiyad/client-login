interface LoginBrandPanelProps {
    logoSrc?: string;
    clientName?: string;
    subdomain?: string;
}

export default function LoginBrandPanel({
    logoSrc,
    clientName = "Client",
    subdomain = "acme.yourportal.com",
}: LoginBrandPanelProps) {
    return (
        <aside className="relative hidden w-1/2 flex-col justify-between bg-[#14573a] p-16 text-white lg:flex">
            <div className="h-[52px]">
                {logoSrc ? (
                    <img src={logoSrc} alt={`${clientName} logo`} className="h-full w-auto object-contain" />
                ) : (
                    <div className="flex h-full w-40 items-center justify-center rounded border border-dashed border-[#9fdfbc] text-xs text-[#d7f3e3]">
                        [CLIENT LOGO]
                    </div>
                )}
            </div>

            <div className="max-w-md">
                <h1 className="text-[40px] font-bold leading-[1.15]">Your reports, in one place.</h1>
                <p className="mt-4 text-lg leading-relaxed text-[#d7f3e3]">
                    Sign in to view reports for your account. Branding and data are set per client.
                </p>
            </div>

            <p className="text-sm text-[#bfe8d1]">{subdomain}</p>
        </aside>
    );
}