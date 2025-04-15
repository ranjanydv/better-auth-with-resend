'use client';
import { signOut, useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage = () => {
    const router = useRouter();
    const { data: session, isPending, error, refetch } = useSession();

    useEffect(() => {
        if (!isPending && !session && !error) {
            router.push('/signin');
        }
    }, [session, isPending, error, router]);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push('/signin');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (isPending) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="mb-4 font-bold text-2xl">Dashboard Page</h1>
            <div className="bg-gray-100 mb-4 p-4 rounded-lg">
                <h2 className="mb-2 font-semibold text-lg">Session Info:</h2>
                <pre className="whitespace-pre-wrap">{JSON.stringify(session, null, 2)}</pre>
            </div>
            <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">
                Sign Out
            </button>
        </div>
    );
};

export default DashboardPage;
