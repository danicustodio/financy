import { useQuery } from '@tanstack/react-query';
import { LIST_TRANSACTIONS_QUERY } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import type { TransactionType } from '@/types/transaction';

export interface ListedTransaction {
	id: string;
	description: string;
	amount: number;
	type: TransactionType;
	date: string;
	category: {
		id: string;
		name: string;
		icon: string;
		color: string;
	};
}

interface ListTransactionsResponse {
	transactions: ListedTransaction[];
}

export const LIST_TRANSACTIONS_QUERY_KEY = ['transactions'] as const;

export function useListTransactions() {
	return useQuery({
		queryKey: LIST_TRANSACTIONS_QUERY_KEY,
		queryFn: authGraphqlRequest<ListTransactionsResponse, undefined>(
			LIST_TRANSACTIONS_QUERY,
		),
		select: (data) => data.transactions,
	});
}
