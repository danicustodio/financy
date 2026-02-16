import { useMemo } from 'react';
import { useListCategories } from '@/features/categories/list-categories';
import type { CategoryOption } from './create-transaction.types';

export function useCategories() {
	const { data = [], isLoading } = useListCategories();
	const categories = useMemo<CategoryOption[]>(
		() =>
			data.map((category) => ({
				id: category.id,
				name: category.name,
				color: category.color,
			})),
		[data],
	);

	return { categories, isLoading };
}
