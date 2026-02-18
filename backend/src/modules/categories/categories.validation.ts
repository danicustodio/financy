import { z } from 'zod/v4';

export const categoryIconSchema = z.enum([
	'utensils',
	'car-front',
	'briefcase-business',
	'ticket',
	'piggy-bank',
	'shopping-cart',
	'heart-pulse',
	'paw-print',
	'house',
	'gift',
	'dumbbell',
	'book-open',
	'receipt-text',
	'mailbox',
	'tool-case',
	'baggage-claim',
]);

export const categoryColorSchema = z.enum([
	'blue',
	'green',
	'red',
	'yellow',
	'purple',
	'orange',
	'pink',
]);

export const createCategoryInputSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	icon: categoryIconSchema,
	description: z.string().optional(),
	color: categoryColorSchema,
});

export const updateCategoryInputSchema = createCategoryInputSchema.extend({
	id: z.uuid('Invalid category id'),
});

export const categoryIdSchema = z.uuid('Invalid category id');

export type CreateCategoryInput = z.infer<typeof createCategoryInputSchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategoryInputSchema>;
