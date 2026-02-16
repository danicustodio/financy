import { useQuery } from '@tanstack/react-query';
import { LIST_CATEGORIES_QUERY } from '@/lib/graphql';
import { authGraphqlRequest } from '@/lib/graphql/graphql-client';

export interface ListedCategory {
	id: string;
	name: string;
	description: string | null;
	color: string;
}

interface ListCategoriesResponse {
	categories: ListedCategory[];
}

export const LIST_CATEGORIES_QUERY_KEY = ['categories'] as const;

export function useListCategories() {
	return useQuery({
		queryKey: LIST_CATEGORIES_QUERY_KEY,
		queryFn: authGraphqlRequest<ListCategoriesResponse, undefined>(
			LIST_CATEGORIES_QUERY,
		),
		select: (data) => data.categories,
	});
}
