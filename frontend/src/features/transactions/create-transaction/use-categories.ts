import { useEffect, useState } from 'react';
import { graphqlRequest } from '@/lib/graphql-client';
import type {
	CategoriesResponse,
	CategoryOption,
} from './create-transaction.types';

const CATEGORIES_QUERY = `
  query Categories {
    categories {
      id
      name
      color
    }
  }
`;

export function useCategories() {
	const [categories, setCategories] = useState<CategoryOption[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await graphqlRequest<CategoriesResponse, undefined>(
					CATEGORIES_QUERY,
				)();
				setCategories(data.categories);
			} catch {
				setCategories([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategories();
	}, []);

	return { categories, isLoading };
}
