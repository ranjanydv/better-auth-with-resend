'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AlertDialogBox from '@/components/custom/AlertDialogBox';
import PasswordInput from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';

import { ChangePasswordFormData, changePasswordSchema } from './schema';
import { changePassword } from './query';

export default function ChangePassword({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) {
    const [isLoading, setIsLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: ChangePasswordFormData) => {
        try {
            setIsLoading(true);
            const result = await changePassword(data);

            if (result.success) {
                reset();
                onSuccess();
            } else {
                toast.error(result.message || 'Failed to change password');
            }
        } catch (error) {
            console.log('🚀 ~ ChangePasswordForm.tsx:149 ~ onSubmit ~ error:', error);

            toast.error('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AlertDialogBox hideFooter aria-label="Change Password" isOpen={isOpen} size="sm" title="Change Password" type="form" onClose={onClose}>
                <form className="space-y-5 -mt-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <h2 className="font-semibold text-primary text-xl">Change Password</h2>
                        <small className="text-gray-700 leading-tight">Your new password must be different from the previous password.</small>
                    </div>
                    <div className="space-y-2">
                        <PasswordInput {...register('currentPassword')} label='Current Password' name="currentPassword" placeholder="Current Password" />
                        {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <PasswordInput showStrengthIndicator {...register('newPassword')} label='New Password' name="newPassword" placeholder="New Password" />
                        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <PasswordInput {...register('confirmPassword')} label='Confirm Password' name="confirmPassword" placeholder="Confirm Password" />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="flex flex-wrap justify-end items-center gap-2 w-full">
                        <Button className="px-6 rounded-full" disabled={isLoading} variant={'outline'} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className="px-6 rounded-full" disabled={isLoading} isLoading={isLoading} type="submit">
                            {isLoading ? 'Changing Password...' : 'Change Password'}
                        </Button>
                    </div>
                </form>
            </AlertDialogBox>
        </>
    );
}
