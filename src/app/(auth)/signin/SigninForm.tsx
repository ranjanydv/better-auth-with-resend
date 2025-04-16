import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import PasswordInput from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoogleIconColor, ShieldSlash } from '@/lib/icons';
import { signin } from './action';
import { createAuthClient } from 'better-auth/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

export default function Login() {
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
                        toast.error('Invalid Credentials');
                        setError('Invalid email or password');
                        break;
                    case 'server-error':
                        toast.error('Something went wrong', { description: 'Please try again' });
                        setError('Server error occurred. Please try again later.');
                        break;
                    default:
                        toast.error('Something went wrong', { description: 'Please try again' });
                        setError(`Authentication failed: ${result.error}`);
                }
            }
        } catch (e) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center bg-gray-50 min-h-[calc(100vh-50px)]">
            <Card className="flex md:flex-row flex-col shadow-lg p-0 rounded-3xl w-full max-w-5xl overflow-hidden">
                {/* Left Column - Login Form */}
                <div className="flex flex-col p-8 md:p-12 lg:p-16 w-full md:w-1/2">
                    <div className="mb-8">
                        <h1 className="mb-2 font-bold text-3xl">Login to your Account</h1>
                        <p className="text-muted-foreground">Welcome back! Select method to log in:</p>
                    </div>
                    <div className="flex justify-center">
                        {/* Google Login Button */}
                        <Button variant="outline" className="mb-8">
                            <GoogleIconColor />
                            Google
                        </Button>
                    </div>
                    {/* Divider */}
                    <div className="relative flex items-center mb-8">
                        <div className="flex-grow border-gray-200 border-t"></div>
                        <span className="flex-shrink mx-4 text-muted-foreground text-sm">or continue with email</span>
                        <div className="flex-grow border-gray-200 border-t"></div>
                    </div>
                    {/* Login Form */}
                    <form action={clientAction} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Input
                                    required
                                    startIcon={<Mail strokeWidth={1.4} />}
                                    type="email"
                                    placeholder="Email"
                                    className="pl-10"
                                    name="email"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <PasswordInput name="password" startIcon={<ShieldSlash />} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember" className="text-sm">
                                    Remember me
                                </Label>
                            </div>
                            <Link href="/forgot-password" className="text-primary text-sm hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                        <Button type="submit" disabled={isLoading} aria-disabled={isLoading} className="w-full">
                            LOG IN
                        </Button>
                    </form>
                    <p className="mt-6 text-sm text-center">
                        Don't have account?{' '}
                        <Link href="/signup" className="text-primary hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
                {/* Right Column - Illustration */}
                <div className="hidden md:block bg-[#2e3a6a] p-12 w-1/2">
                    <div className="flex flex-col justify-center items-center h-full">
                        <div className="flex justify-center items-center mt-auto mb-8">
                            <div className="relative size-56">
                                <Image
                                    fill
                                    src="/logo.png"
                                    alt="Login illustration"
                                    quality={100}
                                    className="rounded-full object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                        <div className="mt-auto text-white text-center">
                            <p className="font-semibold text-base">Connect with any device.</p>
                            <p className="text-primary-foreground text-sm">Everything you need is an internet connection.</p>
                        </div>
                        <div className="flex space-x-1 mt-8">
                            <div className="bg-white rounded-full w-5 h-2"></div>
                            <div className="bg-white/50 rounded-full w-2 h-2"></div>
                            <div className="bg-white/50 rounded-full w-2 h-2"></div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
