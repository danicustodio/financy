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

export const transactionFilterSchema = z.object({
	search: z.string().nullish(),
	type: transactionTypeSchema.nullish(),
	categoryId: z.string().nullish(),
	month: z.int().min(1).max(12).nullish(),
	year: z.int().min(1970).max(9999).nullish(),
});

export const transactionPaginationSchema = z.object({
	page: z.int().min(1),
	pageSize: z.int().min(1).max(100),
});

export type TransactionFilter = z.infer<typeof transactionFilterSchema>;
export type TransactionPagination = z.infer<typeof transactionPaginationSchema>;
