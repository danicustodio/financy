import { useQuery } from '@tanstack/react-query';
import { LIST_TRANSACTIONS_QUERY } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import { mapApiTransactionToDomain } from '@/mappers/api-to-domain/transaction.api-to-domain.mapper';
import type {
	ListTransactionsResponse,
	ListTransactionsVariables,
	TransactionFilterInput,
	TransactionPaginationInput,
} from '@/types/api/operations';

export const LIST_TRANSACTIONS_QUERY_KEY = ['transactions'] as const;

interface UseListTransactionsParams {
	filter?: TransactionFilterInput;
	pagination: TransactionPaginationInput;
}

export function useListTransactions({
	filter,
	pagination,
}: UseListTransactionsParams) {
	return useQuery({
		queryKey: [...LIST_TRANSACTIONS_QUERY_KEY, { filter, pagination }],
		queryFn: authGraphqlRequest<
			ListTransactionsResponse,
			ListTransactionsVariables
		>(LIST_TRANSACTIONS_QUERY, { filter, pagination }),
		select: (data) => ({
			items: data.transactions.items.map(mapApiTransactionToDomain),
			totalCount: data.transactions.totalCount,
		}),
	});
}
