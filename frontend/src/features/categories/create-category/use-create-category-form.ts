import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LIST_CATEGORIES_QUERY_KEY } from '@/features/categories/list-categories';
import { CREATE_CATEGORY_MUTATION } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import { mapCreateCategoryError } from './create-category.mapper';
import type {
	CreateCategoryFormData,
	CreateCategoryResponse,
} from './create-category.types';

export function useCreateCategoryForm(onSuccess?: () => void) {
	const [formError, setFormError] = useState<string | null>(null);
	const queryClient = useQueryClient();

	const form = useForm<CreateCategoryFormData>({
		defaultValues: {
			name: '',
			description: '',
			icon: 'utensils',
			color: 'blue',
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		setFormError(null);

		try {
			await authGraphqlRequest<
				CreateCategoryResponse,
				{ input: CreateCategoryFormData }
			>(CREATE_CATEGORY_MUTATION, {
				input: {
					name: data.name,
					description: data.description || '',
					icon: data.icon,
					color: data.color,
				},
			})();
			await queryClient.invalidateQueries({
				queryKey: LIST_CATEGORIES_QUERY_KEY,
			});

			onSuccess?.();
		} catch (error) {
			setFormError(mapCreateCategoryError(error));
		}
	});

	return {
		form,
		formError,
		isSubmitting: form.formState.isSubmitting,
		onSubmit,
	};
}
