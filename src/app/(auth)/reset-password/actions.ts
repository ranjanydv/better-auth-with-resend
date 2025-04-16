'use server';

import { auth } from '@/lib/auth';

// export async function resetPassword(formData: FormData) {
// 	const email = formData.get('email');

// }

export async function updatePassword(userId: string, formData: FormData) {
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        return { error: 'Passwords do not match' };
    }

    const ctx = await auth.$context;
    const hash = await ctx.password.hash(password as string);

    await ctx.internalAdapter.updatePassword(userId, hash);
}
