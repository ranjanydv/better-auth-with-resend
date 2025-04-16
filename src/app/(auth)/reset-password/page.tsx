'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { createAuthClient } from 'better-auth/client';
const ResetPasswordForm = () => {
    const authClient = createAuthClient();
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    console.log('🚀 ~ page.tsx:13 ~ ResetPasswordForm ~ token:', token);

    // async function clientAction(formData: FormData) {
    //     try {
    //         setIsLoading(true);
    //         setError(null);

    //         const result = await resetPassword(formData);

    //         if (result.success) {
    //             router.push(result.redirectTo);
    //         } else {
    //             // Handle different error types with specific messages
    //             console.log('🚀 ~ page.tsx:23 ~ clientAction ~ result.error:', result.error);
    //             switch (result.error) {
    //                 case 'auth-failed':
    //                     setError('Invalid email or password');
    //                     break;
    //                 case 'server-error':
    //                     setError('Server error occurred. Please try again later.');
    //                     break;
    //                 default:
    //                     setError(`Authentication failed: ${result.error}`);
    //             }
    //         }
    //     } catch (e) {
    //         setError('An unexpected error occurred. Please try again.');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    async function clientAction(formData: FormData) {
        if (!formData.get('email')) {
            setError('Email is required');

            return;
        }
        const { data, error } = await authClient.forgetPassword({
            email: formData.get('email') as string,
            redirectTo: '/reset-password',
        });
    }

    return (
        <form action={clientAction}>
            <div className="flex flex-col justify-center items-center gap-4 h-screen">
                <h1 className="mb-4 font-bold text-2xl">Reset Password</h1>
                {error && <div className="bg-red-100 mb-4 px-4 py-3 border border-red-400 rounded text-red-700">{error}</div>}
                <input required className="p-2 border rounded w-64" name="email" placeholder="Email" type="email" />

                <button
                    aria-disabled={isLoading}
                    className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded text-white disabled:cursor-not-allowed"
                    disabled={isLoading}
                    type="submit"
                >
                    {isLoading ? 'Sending reset link...' : 'Reset Password'}
                </button>
            </div>
        </form>
    );
};

export default ResetPasswordForm;
