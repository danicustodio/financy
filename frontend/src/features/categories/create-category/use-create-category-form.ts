import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { graphqlRequest } from '@/lib/graphql-client';
import { mapCreateCategoryError } from './create-category.mapper';
import type {
	CreateCategoryFormData,
	CreateCategoryResponse,
} from './create-category.types';

const CREATE_CATEGORY_MUTATION = `
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      icon
      description
      color
    }
  }
`;

export function useCreateCategoryForm(onSuccess?: () => void) {
	const [formError, setFormError] = useState<string | null>(null);

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
			await graphqlRequest<
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
