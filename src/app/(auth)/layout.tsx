export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className="flex gap-3 p-4">{children}</main>
        </>
    );
}
