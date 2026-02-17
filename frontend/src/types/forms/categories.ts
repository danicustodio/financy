import type { CategoryColor, CategoryIconName } from '@/types/domain/category';

export interface CreateCategoryFormData {
	name: string;
	description?: string;
	icon: CategoryIconName;
	color: CategoryColor;
}
