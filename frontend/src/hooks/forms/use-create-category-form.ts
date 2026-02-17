import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { mapCreateCategoryError } from '@/mappers/create-category.mapper';
import { useCreateCategoryMutation } from '../mutations/use-create-category-mutation';

const categoryIconSchema = z.enum([
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

const categoryColorSchema = z.enum([
	'blue',
	'green',
	'red',
	'yellow',
	'purple',
	'orange',
	'pink',
	'gray',
]);

export const createCategorySchema = z.object({
	name: z.string().min(1, 'Título é obrigatório'),
	description: z.string().optional(),
	icon: categoryIconSchema,
	color: categoryColorSchema,
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;

export interface CreateCategoryResponse {
	createCategory: {
		id: string;
		name: string;
		icon: string;
		description: string | null;
		color: string;
	};
}

export function useCreateCategoryForm(onSuccess?: () => void) {
	const [formError, setFormError] = useState<string | null>(null);
	const createCategoryMutation = useCreateCategoryMutation();

	const form = useForm<CreateCategoryFormData>({
		resolver: zodResolver(createCategorySchema),
		defaultValues: {
			name: '',
			description: '',
			icon: 'briefcase-business',
			color: 'green',
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		setFormError(null);

		try {
			await createCategoryMutation.mutateAsync({
				name: data.name,
				description: data.description || '',
				icon: data.icon,
				color: data.color,
			});
			onSuccess?.();
		} catch (error) {
			setFormError(mapCreateCategoryError(error));
		}
	});

	return {
		form,
		formError,
		isSubmitting: createCategoryMutation.isPending,
		onSubmit,
	};
}
