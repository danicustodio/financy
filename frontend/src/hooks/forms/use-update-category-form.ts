import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { mapGraphQLError } from '@/mappers/errors/graphql-error.mapper';
import {
	UPDATE_CATEGORY_ERROR_FALLBACK,
	UPDATE_CATEGORY_ERROR_RULES,
} from '@/mappers/errors/graphql-error-rules';
import { toUpdateCategoryInput } from '@/mappers/form-to-api/category.form-to-api.mapper';
import type { Category } from '@/types/domain/category';
import type { UpdateCategoryFormData } from '@/types/forms/categories';
import { useUpdateCategoryMutation } from '../mutations/use-update-category-mutation';
import { createCategorySchema } from './use-create-category-form';

const updateCategorySchema = createCategorySchema.extend({
	id: z.uuid('Id da categoria inválido'),
});

export function useUpdateCategoryForm(
	category: Category,
	onSuccess?: () => void,
) {
	const [formError, setFormError] = useState<string | null>(null);
	const updateCategoryMutation = useUpdateCategoryMutation();

	const form = useForm<UpdateCategoryFormData>({
		resolver: zodResolver(updateCategorySchema),
		defaultValues: {
			id: category.id,
			title: category.title,
			description: category.description ?? '',
			icon: category.icon,
			color: category.color,
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		setFormError(null);

		try {
			await updateCategoryMutation.mutateAsync(toUpdateCategoryInput(data));
			onSuccess?.();
		} catch (error) {
			setFormError(
				mapGraphQLError(
					error,
					UPDATE_CATEGORY_ERROR_FALLBACK,
					UPDATE_CATEGORY_ERROR_RULES,
				),
			);
		}
	});

	return {
		form,
		formError,
		isSubmitting: updateCategoryMutation.isPending,
		onSubmit,
	};
}
