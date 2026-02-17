import type { CreateCategoryInput } from '@/types/api/operations';
import type { CreateCategoryFormData } from '@/types/forms/categories';

export function toCreateCategoryInput(
	form: CreateCategoryFormData,
): CreateCategoryInput {
	return {
		name: form.name,
		description: form.description ?? '',
		icon: form.icon,
		color: form.color,
	};
}
