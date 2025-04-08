import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        redirect('/signin');
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto sm:px-6 lg:px-8 py-6 max-w-7xl">
                {children}
            </div>
        </div>
    );
}
