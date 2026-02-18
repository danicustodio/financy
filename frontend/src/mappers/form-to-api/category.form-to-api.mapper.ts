import type {
	CreateCategoryInput,
	UpdateCategoryInput,
} from '@/types/api/operations';
import type {
	CreateCategoryFormData,
	UpdateCategoryFormData,
} from '@/types/forms/categories';

export function toCreateCategoryInput(
	form: CreateCategoryFormData,
): CreateCategoryInput {
	return {
		...form,
		description: form.description ?? '',
	};
}

export function toUpdateCategoryInput(
	form: UpdateCategoryFormData,
): UpdateCategoryInput {
	return {
		...form,
		description: form.description ?? '',
	};
}
