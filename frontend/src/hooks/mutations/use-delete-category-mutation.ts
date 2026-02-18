import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DELETE_CATEGORY_MUTATION } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import type {
	DeleteCategoryResponse,
	DeleteCategoryVariables,
} from '@/types/api/operations';
import { CATEGORIES_SUMMARY_QUERY_KEY } from '../queries/use-categories-summary';
import { LIST_CATEGORIES_QUERY_KEY } from '../queries/use-list-categories';

export function useDeleteCategoryMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (variables: DeleteCategoryVariables) =>
			authGraphqlRequest<DeleteCategoryResponse, DeleteCategoryVariables>(
				DELETE_CATEGORY_MUTATION,
				variables,
			)(),
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
