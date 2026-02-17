import type { CategoryColor, CategoryIconName } from '@/types/domain/category';

export interface CreateCategoryFormData {
	title: string;
	description?: string;
	icon: CategoryIconName;
	color: CategoryColor;
}
