import { authClient } from '@/lib/auth-client';
import { ChangePasswordFormData } from './schema';

export async function changePassword(data: ChangePasswordFormData): Promise<{ success: boolean; message?: string }> {
    try {
        await authClient.changePassword({
            newPassword: data.newPassword,
            currentPassword: data.currentPassword,
            revokeOtherSessions: true,
        });

        return {
            success: true,
            message: 'Password changed successfully',
        };
    } catch (error) {
        console.error('Password change error:', error);
        
        // Handle specific error cases if needed
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message || 'Failed to change password',
            };
        }

        return {
            success: false,
            message: 'An unexpected error occurred while changing password',
        };
    }
}
