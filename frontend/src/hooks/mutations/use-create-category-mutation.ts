import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CREATE_CATEGORY_MUTATION } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import { LIST_CATEGORIES_QUERY_KEY } from '../queries/use-list-categories';

interface CreateCategoryInput {
	name: string;
	description: string;
	icon: string;
	color: string;
}

interface CreateCategoryResponse {
	createCategory: {
		id: string;
	};
}

export function useCreateCategoryMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateCategoryInput) =>
			authGraphqlRequest<CreateCategoryResponse, { input: CreateCategoryInput }>(
				CREATE_CATEGORY_MUTATION,
				{ input },
			)(),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: LIST_CATEGORIES_QUERY_KEY,
			});
		},
	});
}
