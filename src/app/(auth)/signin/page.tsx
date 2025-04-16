'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { createAuthClient } from 'better-auth/client';

import { signin } from './action';
import Login from './SigninForm';
const SignInForm = () => {
    const authClient = createAuthClient();
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    async function clientAction(formData: FormData) {
        try {
            setIsLoading(true);
            setError(null);

            const result = await signin(formData);

            if (result.success) {
                router.push(result.redirectTo);
            } else {
                // Handle different error types with specific messages
                console.log('🚀 ~ page.tsx:23 ~ clientAction ~ result.error:', result.error);
                switch (result.error) {
                    case 'auth-failed':
                        setError('Invalid email or password');
                        break;
                    case 'server-error':
                        setError('Server error occurred. Please try again later.');
                        break;
                    default:
                        setError(`Authentication failed: ${result.error}`);
                }
            }
        } catch (e) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const signInWithGithub = async () => {
        await authClient.signIn.social({
            provider: 'github',
        });
    };

    return (
        // <form action={clientAction}>
        //     <div className="flex flex-col justify-center items-center gap-4 max-w-sm h-screen">
        //         <h1 className="mb-4 font-bold text-2xl">Sign In</h1>
        //         {error && <div className="bg-red-100 mb-4 px-4 py-3 border border-red-400 rounded text-red-700">{error}</div>}
        //         <input type="email" name="email" placeholder="Email" className="p-2 border rounded w-64" required />
        //         <input type="password" name="password" placeholder="Password" className="p-2 border rounded w-64" required />
        //         <Link href="/reset-password">Forgot Password?</Link>
        //         <button
        //             type="submit"
        //             className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded text-white disabled:cursor-not-allowed"
        //             disabled={isLoading}
        //             aria-disabled={isLoading}>
        //             {isLoading ? 'Signing in...' : 'Sign In'}
        //         </button>
        //         <div className="flex flex-col gap-2">
        //             <button
        //                 onClick={signInWithGithub}
        //                 className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded text-white disabled:cursor-not-allowed">
        //                 Sign In with Github
        //             </button>
        //         </div>
        //     </div>
        // </form>
        <Login />
    );
};

export default SignInForm;
