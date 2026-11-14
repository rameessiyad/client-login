export default function PageLoader() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white" role="status" aria-label="Loading">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#d7f3e3] border-t-[#20884e]" />
        </div>
    );
}