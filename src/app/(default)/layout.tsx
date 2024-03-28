'use client';

import { Footer, Header } from '@/common';

interface IDefaultLayout {
    children: React.ReactNode;
}

export default function DefaultLayout({ children }: IDefaultLayout) {
    return (
        <>
            <Header />
            <main className="w-full h-full">{children}</main>
            <Footer />
        </>
    );
}
