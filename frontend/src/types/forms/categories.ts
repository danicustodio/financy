import type { Category } from '@/types/domain/category';

export type CreateCategoryFormData = Omit<Category, 'id' | 'description'> & {
	description?: string;
};
