import { useQuery } from '@tanstack/react-query';
import { graphqlRequest } from '@/lib/graphql-client';

export interface ListedCategory {
	id: string;
	name: string;
	description: string | null;
	color: string;
}

interface ListCategoriesResponse {
	categories: ListedCategory[];
}

const LIST_CATEGORIES_QUERY = `
  query ListCategories {
    categories {
      id
      name
      description
      color
    }
  }
`;

export const LIST_CATEGORIES_QUERY_KEY = ['categories'] as const;

export function useListCategories() {
	return useQuery({
		queryKey: LIST_CATEGORIES_QUERY_KEY,
		queryFn: graphqlRequest<ListCategoriesResponse, undefined>(
			LIST_CATEGORIES_QUERY,
		),
		select: (data) => data.categories,
	});
}
