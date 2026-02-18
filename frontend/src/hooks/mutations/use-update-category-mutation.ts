import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UPDATE_CATEGORY_MUTATION } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import type {
	UpdateCategoryInput,
	UpdateCategoryResponse,
} from '@/types/api/operations';
import { CATEGORIES_SUMMARY_QUERY_KEY } from '../queries/use-categories-summary';
import { LIST_CATEGORIES_QUERY_KEY } from '../queries/use-list-categories';

export function useUpdateCategoryMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: UpdateCategoryInput) =>
			authGraphqlRequest<
				UpdateCategoryResponse,
				{ input: UpdateCategoryInput }
			>(UPDATE_CATEGORY_MUTATION, { input })(),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: LIST_CATEGORIES_QUERY_KEY,
				}),
				queryClient.invalidateQueries({
					queryKey: CATEGORIES_SUMMARY_QUERY_KEY,
				}),
			]);
		},
	});
}
