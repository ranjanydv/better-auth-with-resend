'use server';

import { auth } from '@/lib/auth';

import { changePasswordSchema } from './schema';

export const changePassword = async (formData: FormData) => {
    try {
        const currentPassword = formData.get('currentPassword') as string;
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        // Validate the form data
        const result = changePasswordSchema.safeParse({
            currentPassword,
            newPassword,
            confirmPassword,
        });

        if (!result.success) {
            return {
                success: false,
                message: result.error.errors[0].message,
                error: result.error.errors[0].message,
            };
        }

        if (newPassword !== confirmPassword) {
            return {
                success: false,
                message: "Passwords don't match",
                error: "Passwords don't match",
            };
        }
        if (newPassword === currentPassword) {
            return {
                success: false,
                message: 'New password must be different from current password',
                error: 'New password must be different from current password',
            };
        }

        const response = await auth.api.changePassword({
            body: {
                currentPassword,
                newPassword,
                revokeOtherSessions: true,
            },
            asResponse: true,
        });

        if (!response.ok) {
            console.log('🚀 ~ action.ts:52 ~ changePassword ~ response:', response);

            let errorMessage = 'Failed to change password';

            try {
                const errorData = await response.json();

                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                // If JSON parsing fails, use the status text or default message
                errorMessage = response.statusText || errorMessage;
            }

            return {
                success: false,
                message: errorMessage,
                error: errorMessage,
            };
        }

        return {
            success: true,
            message: 'Password changed successfully',
        };
    } catch (error) {
        console.error('Password change error:', error);

        return {
            success: false,
            message: 'An unexpected error occurred while changing password',
            error: 'An unexpected error occurred while changing password',
        };
    }
};
