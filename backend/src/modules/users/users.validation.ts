import { z } from 'zod/v4';

export const updateMeInputSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters').optional(),
	email: z.email('Invalid email address').optional(),
});

export type UpdateMeInput = z.infer<typeof updateMeInputSchema>;
