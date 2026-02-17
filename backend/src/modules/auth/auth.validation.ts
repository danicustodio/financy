import { z } from 'zod/v4';

export const signUpInputSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginInputSchema = z.object({
	email: z.email('Invalid email address'),
	password: z.string().min(1, 'Password is required'),
});

export type SignUpInput = z.infer<typeof signUpInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
