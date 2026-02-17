import { useQuery } from '@tanstack/react-query';
import { LIST_TRANSACTIONS_QUERY } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import { mapApiTransactionToDomain } from '@/mappers/api-to-domain/transaction.api-to-domain.mapper';
import type { ListTransactionsResponse } from '@/types/api/operations';

export const LIST_TRANSACTIONS_QUERY_KEY = ['transactions'] as const;

export function useListTransactions() {
	return useQuery({
		queryKey: LIST_TRANSACTIONS_QUERY_KEY,
		queryFn: authGraphqlRequest<ListTransactionsResponse, undefined>(
			LIST_TRANSACTIONS_QUERY,
		),
		select: (data) => data.transactions.map(mapApiTransactionToDomain),
	});
}
