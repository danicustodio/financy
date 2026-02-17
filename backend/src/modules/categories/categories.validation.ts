import { z } from 'zod/v4';

export const categoryIconSchema = z.enum([
	'utensils',
	'car-front',
	'briefcase-business',
	'ticket',
	'piggy-bank',
	'shopping-cart',
	'heart-pulse',
	'tag',
	'tool-case',
	'paw-print',
	'house',
	'gift',
	'dumbbell',
	'book-open',
	'receipt-text',
	'mailbox',
]);

export const categoryColorSchema = z.enum([
	'blue',
	'green',
	'red',
	'yellow',
	'purple',
	'orange',
	'pink',
	'gray',
]);

export const createCategoryInputSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	icon: categoryIconSchema,
	description: z.string().optional(),
	color: categoryColorSchema,
});

export type CreateCategoryInput = z.infer<typeof createCategoryInputSchema>;
