import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CREATE_CATEGORY_MUTATION } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import type {
	CreateCategoryInput,
	CreateCategoryResponse,
} from '@/types/api/operations';
import { LIST_CATEGORIES_QUERY_KEY } from '../queries/use-list-categories';

export function useCreateCategoryMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateCategoryInput) =>
			authGraphqlRequest<
				CreateCategoryResponse,
				{ input: CreateCategoryInput }
			>(CREATE_CATEGORY_MUTATION, { input })(),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: LIST_CATEGORIES_QUERY_KEY,
			});
		},
	});
}
