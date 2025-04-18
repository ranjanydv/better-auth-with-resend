'use client';

import { Mail, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { createAuthClient } from 'better-auth/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import PasswordInput from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoogleIconColor, ShieldSlash } from '@/lib/icons';

import { signinSchema, type SigninFormData } from './schema';
import { signin } from './action';

export default function Login() {
    const authClient = createAuthClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormData>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: SigninFormData) => {
        try {
            setIsLoading(true);
            const formData = new FormData();

            formData.append('email', data.email);
            formData.append('password', data.password);

            const result = await signin(formData);

            if (result.success) {
                toast.success('Logged in successfully');
                router.push(result.redirectTo || '/dashboard');
            } else {
                toast.error(result.message || 'Invalid credentials');
            }
        } catch (error) {
            console.log('🚀 ~ SigninForm.tsx:58 ~ onSubmit ~ error:', error);

            toast.error('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGithub = async () => {
        try {
            await authClient.signIn.social({
                provider: 'github',
            });
        } catch (error) {
            console.log('🚀 ~ SigninForm.tsx:72 ~ signInWithGithub ~ error:', error);

            toast.error('Failed to sign in with GitHub');
        }
    };

    const signInWithGoogle = async () => {
        try {
            await authClient.signIn.social({
                provider: 'google',
            });
        } catch (error) {
            console.log('🚀 ~ SigninForm.tsx:84 ~ signInWithGoogle ~ error:', error);

            toast.error('Failed to sign in with Google');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-50px)]">
            <Card className="flex md:flex-row flex-col bg-background shadow-lg p-0 rounded-3xl w-full max-w-5xl overflow-hidden">
                {/* Left Column - Login Form */}
                <div className="flex flex-col p-8 md:p-12 lg:p-16 w-full md:w-1/2">
                    <div className="mb-8">
                        <h1 className="mb-2 font-bold text-3xl">Login to your Account</h1>
                        <p className="text-muted-foreground">Welcome back! Select method to log in:</p>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        {/* Google Login Button */}
                        <Button className="mb-8" variant="outline" onClick={signInWithGoogle}>
                            <GoogleIconColor />
                            Google
                        </Button>
                        <Button className="mb-8" variant="outline" onClick={signInWithGithub}>
                            <Github />
                            Github
                        </Button>
                    </div>
                    {/* Divider */}
                    <div className="relative flex items-center mb-8">
                        <div className="flex-grow border-gray-200 border-t" />
                        <span className="flex-shrink mx-4 text-muted-foreground text-sm">or continue with email</span>
                        <div className="flex-grow border-gray-200 border-t" />
                    </div>
                    {/* Login Form */}
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Input
                                {...register('email')}
                                required
                                className="pl-10"
                                placeholder="Email"
                                startIcon={<Mail strokeWidth={1.4} />}
                                type="email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <PasswordInput {...register('password')} label='' name="password" startIcon={<ShieldSlash />} />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <Label className="text-sm" htmlFor="remember">
                                    Remember me
                                </Label>
                            </div>
                            <Link className="text-primary text-sm hover:underline" href="/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>
                        <Button className="w-full" disabled={isLoading} type="submit">
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </Button>
                    </form>
                    <p className="mt-6 text-sm text-center">
                        Don&apos;t have account?{' '}
                        <Link className="text-primary hover:underline" href="/signup">
                            Create an account
                        </Link>
                    </p>
                </div>
                <div className="hidden md:block bg-primary p-12 w-1/2">
                    <div className="flex flex-col justify-center items-center h-full">
                        <div className="flex justify-center items-center mt-auto mb-8">
                            <div className="relative flex justify-center items-center bg-gradient-to-b from-white/20 via-primary to-primary p-4 rounded-full size-96 overflow-hidden">
                                <div className="relative size-72">
                                    <Image
                                        fill
                                        alt="Signup"
                                        className="z-10 -ml-3 object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        src="/assets/signin.png"
                                    />
                                </div>
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <div className="bg-gradient-to-b from-white/50 to-white/30 rounded-full size-[calc(100%-3rem)]" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto text-white text-center">
                            <p className="font-semibold text-base">Connect with any device.</p>
                            <p className="text-primary-foreground text-sm">Everything you need is an internet connection.</p>
                        </div>
                        <div className="flex space-x-1 mt-8">
                            <div className="bg-white rounded-full w-5 h-2" />
                            <div className="bg-white/50 rounded-full w-2 h-2" />
                            <div className="bg-white/50 rounded-full w-2 h-2" />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
