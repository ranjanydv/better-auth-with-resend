'use server';

import { auth } from '@/lib/auth';

export const signup = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    if (!name || !email || !password || !confirmPassword) return { success: false, message: "All fields are required" }
    if (password !== confirmPassword) return { success: false, message: "Passwords do not match" }

    await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        },
        asResponse: true,
    });

    // Don't return the response
};
