import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CREATE_TRANSACTION_MUTATION } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import type {
	CreateTransactionInput,
	CreateTransactionResponse,
} from '@/types/api/operations';
import { CATEGORIES_SUMMARY_QUERY_KEY } from '../queries/use-categories-summary';
import { DASHBOARD_SUMMARY_QUERY_KEY } from '../queries/use-dashboard-summary';
import { LIST_CATEGORIES_QUERY_KEY } from '../queries/use-list-categories';
import { LIST_TRANSACTIONS_QUERY_KEY } from '../queries/use-list-transactions';

export function useCreateTransactionMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateTransactionInput) =>
			authGraphqlRequest<
				CreateTransactionResponse,
				{ input: CreateTransactionInput }
			>(CREATE_TRANSACTION_MUTATION, { input })(),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: LIST_TRANSACTIONS_QUERY_KEY,
				}),
				queryClient.invalidateQueries({ queryKey: LIST_CATEGORIES_QUERY_KEY }),
				queryClient.invalidateQueries({
					queryKey: DASHBOARD_SUMMARY_QUERY_KEY,
				}),
				queryClient.invalidateQueries({
					queryKey: CATEGORIES_SUMMARY_QUERY_KEY,
				}),
			]);
		},
	});
}
