import { useQuery } from '@tanstack/react-query';
import { LIST_CATEGORIES_QUERY } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import { mapApiCategoryToDomain } from '@/mappers/api-to-domain/category.api-to-domain.mapper';
import type { ListCategoriesResponse } from '@/types/api/operations';

export const LIST_CATEGORIES_QUERY_KEY = ['categories'] as const;

export function useListCategories() {
	return useQuery({
		queryKey: LIST_CATEGORIES_QUERY_KEY,
		queryFn: authGraphqlRequest<ListCategoriesResponse, undefined>(
			LIST_CATEGORIES_QUERY,
		),
		select: (data) => data.categories.map(mapApiCategoryToDomain),
	});
}
