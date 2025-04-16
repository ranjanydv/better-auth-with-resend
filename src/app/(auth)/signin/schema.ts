import { z } from 'zod';

export const signinSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export type SigninFormData = z.infer<typeof signinSchema>;
