'use server';

import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

type SignInResult = { success: true; redirectTo: string } | { success: false; error: string };

export const signin = async (formData: FormData): Promise<SignInResult> => {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        return { success: false, error: 'auth-failed' };
    }

    try {
        const result = await auth.api.signInEmail({
            body: {
                email,
                password,
            },
            headers: await headers(),
        });

        if (result?.user) {
            return { success: true, redirectTo: '/dashboard' };
        }
        if (!result?.user?.emailVerified) {
            return { success: false, error: 'email-not-verified' };
        }

        return { success: false, error: 'auth-failed' };
    } catch (error) {
        console.error('Authentication error:', error);
        if (error instanceof Error && error.message.includes('auth')) {
            return { success: false, error: 'auth-failed' };
        }

        return { success: false, error: 'server-error' };
    }
};
