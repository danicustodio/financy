import type {
	CategoryColor,
	CategoryIconName,
} from '@/types/domain/category';

export interface CreateCategoryFormData {
	title: string;
	icon: CategoryIconName;
	color: CategoryColor;
	description?: string;
}
