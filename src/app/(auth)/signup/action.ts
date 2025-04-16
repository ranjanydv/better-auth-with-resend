'use server';

import { auth } from '@/lib/auth';
import { signupSchema } from './schema';

export const signup = async (formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirm-password') as string;

        // Validate the form data
        const result = signupSchema.safeParse({
            name,
            email,
            password,
            confirmPassword,
        });

        if (!result.success) {
            return {
                success: false,
                message: result.error.errors[0].message,
            };
        }

        // Attempt to sign up the user
        const response = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
            asResponse: true,
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.message || 'Failed to create account',
            };
        }

        return {
            success: true,
            message: 'Account created successfully',
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: 'An unexpected error occurred',
        };
    }
};

