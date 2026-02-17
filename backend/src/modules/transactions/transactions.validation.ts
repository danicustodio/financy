import { z } from 'zod/v4';

export const transactionTypeSchema = z.enum(['income', 'expense']);

export const createTransactionInputSchema = z.object({
	description: z.string().min(1, 'Description is required'),
	amount: z.int().positive('Amount must be positive'),
	type: transactionTypeSchema,
	date: z.date(),
	categoryId: z.string().min(1, 'Category is required'),
});

export type CreateTransactionInput = z.infer<
	typeof createTransactionInputSchema
>;
