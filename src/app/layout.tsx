'use client';

import { AppContextProvider } from '@/shared';
import { MantineProvider } from '@mantine/core';
import { Poppins, Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import '@mantine/code-highlight/styles.css';
import '@mantine/core/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css';
import './global.css';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
});

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Bhavan AI</title>
                <link rel="icon" href="/logo.svg" sizes="any" />
            </head>
            <body
                className={`${poppins.variable} ${roboto.variable} font-poppins antialiased bg-custom-100 text-gray-300 tracking-tight`}
            >
                <div className="flex flex-col min-h-screen justify-between supports-[overflow:clip]:overflow-clip max-w-6xl mx-auto ">
                    <MantineProvider defaultColorScheme="dark">
                        <AppContextProvider>{children}</AppContextProvider>
                    </MantineProvider>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={12}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </body>
        </html>
    );
}
