import type { Metadata } from 'next';

import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
    icons: {
        icon: '/logo.png',
        apple: '/logo.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} font-sans antialiased`}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
