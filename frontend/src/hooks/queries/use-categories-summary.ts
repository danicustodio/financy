import { useQuery } from '@tanstack/react-query';
import { CATEGORIES_SUMMARY_QUERY } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import {
	toCategoryColor,
	toCategoryIconName,
} from '@/mappers/api-to-domain/category.api-to-domain.mapper';
import type { CategoriesSummaryResponse } from '@/types/api/operations';

export const CATEGORIES_SUMMARY_QUERY_KEY = ['categoriesSummary'] as const;

export function useCategoriesSummary() {
	return useQuery({
		queryKey: CATEGORIES_SUMMARY_QUERY_KEY,
		queryFn: authGraphqlRequest<CategoriesSummaryResponse, undefined>(
			CATEGORIES_SUMMARY_QUERY,
		),
		select: (data) => {
			const { mostUsedCategory } = data.categoriesSummary;
			return {
				...data.categoriesSummary,
				mostUsedCategory:
					mostUsedCategory != null
						? {
								...mostUsedCategory,
								icon: toCategoryIconName(mostUsedCategory.icon),
								color: toCategoryColor(mostUsedCategory.color),
							}
						: null,
			};
		},
	});
}
