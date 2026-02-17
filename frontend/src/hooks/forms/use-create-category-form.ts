import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import {
	CATEGORY_COLOR_NAMES,
	CATEGORY_ICON_NAMES,
} from '@/constants/category';
import {
	CREATE_CATEGORY_ERROR_FALLBACK,
	CREATE_CATEGORY_ERROR_RULES,
} from '@/mappers/errors/graphql-error-rules';
import { mapGraphQLError } from '@/mappers/errors/graphql-error.mapper';
import { toCreateCategoryInput } from '@/mappers/form-to-api/category.form-to-api.mapper';
import type { CreateCategoryFormData } from '@/types/forms/categories';
import { useCreateCategoryMutation } from '../mutations/use-create-category-mutation';

export const createCategorySchema = z.object({
	title: z.string().min(1, 'Título é obrigatório'),
	description: z.string().optional(),
	icon: z.enum(CATEGORY_ICON_NAMES),
	color: z.enum(CATEGORY_COLOR_NAMES),
});

export function useCreateCategoryForm(onSuccess?: () => void) {
	const [formError, setFormError] = useState<string | null>(null);
	const createCategoryMutation = useCreateCategoryMutation();

	const form = useForm<CreateCategoryFormData>({
		resolver: zodResolver(createCategorySchema),
		defaultValues: {
			title: '',
			description: '',
			icon: 'briefcase-business',
			color: 'green',
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		setFormError(null);

		try {
			await createCategoryMutation.mutateAsync(toCreateCategoryInput(data));
			onSuccess?.();
		} catch (error) {
			setFormError(
				mapGraphQLError(
					error,
					CREATE_CATEGORY_ERROR_FALLBACK,
					CREATE_CATEGORY_ERROR_RULES,
				),
			);
		}
	});

	return {
		form,
		formError,
		isSubmitting: createCategoryMutation.isPending,
		onSubmit,
	};
}
