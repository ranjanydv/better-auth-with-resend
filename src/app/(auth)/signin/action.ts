'use server';

import { auth } from '@/lib/auth';
import { signinSchema } from './schema';

export const signin = async (formData: FormData) => {
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Validate the form data
        const result = signinSchema.safeParse({
            email,
            password,
        });

        if (!result.success) {
            return {
                success: false,
                message: result.error.errors[0].message,
            };
        }

        // Attempt to sign in the user
        const response = await auth.api.signInEmail({
            body: {
                email,
                password,
            },
            asResponse: true,
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.message || 'Invalid credentials',
            };
        }

        return {
            success: true,
            message: 'Logged in successfully',
            redirectTo: '/dashboard',
        };
    } catch (error) {
        console.error('Signin error:', error);
        return {
            success: false,
            message: 'An unexpected error occurred',
        };
    }
};
