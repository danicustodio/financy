import { useState } from 'react';
import { type RegisterOptions, useForm } from 'react-hook-form';
import { mapCreateCategoryError } from '@/mappers/create-category.mapper';
import { useCreateCategoryMutation } from '../mutations/use-create-category-mutation';

export interface CreateCategoryFormData {
	name: string;
	description: string;
	icon: string;
	color: string;
}

export interface CreateCategoryResponse {
	createCategory: {
		id: string;
		name: string;
		icon: string;
		description: string | null;
		color: string;
	};
}

export const createCategoryFormRules: Pick<
	{
		[K in keyof CreateCategoryFormData]: RegisterOptions<
			CreateCategoryFormData,
			K
		>;
	},
	'name'
> = {
	name: {
		required: 'Título é obrigatório',
		minLength: {
			value: 1,
			message: 'Título é obrigatório',
		},
	},
};

export function useCreateCategoryForm(onSuccess?: () => void) {
	const [formError, setFormError] = useState<string | null>(null);
	const createCategoryMutation = useCreateCategoryMutation();

	const form = useForm<CreateCategoryFormData>({
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
