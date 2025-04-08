import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
	
    if (session) {
        console.log('Session found, redirecting to dashboard');
        redirect('/dashboard');
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto sm:px-6 lg:px-8 py-6 max-w-7xl">{children}</div>
        </div>
    );
}
