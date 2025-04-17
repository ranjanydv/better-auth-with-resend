import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        console.log('Session found, redirecting to dashboard');
        redirect('/dashboard');
    }

    return (
        <main className="h-screen min-h-screen max-h-screen overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-40 [background-size:40px_40px]" />
            <div className="relative flex flex-col justify-center items-center">
                <div className="mx-auto sm:px-6 lg:px-8 py-6 max-w-7xl">{children}</div>
            </div>
        </main>
    );
}
