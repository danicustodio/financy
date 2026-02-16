import { useQuery } from '@tanstack/react-query';
import { graphqlRequest } from '@/lib/graphql-client';

export interface ListedTransaction {
	id: string;
	description: string;
	amountCents: number;
	type: 'income' | 'expense';
	date: string;
	category: {
		id: string;
		name: string;
		color: string;
	};
}

interface ListTransactionsResponse {
	transactions: ListedTransaction[];
}

const LIST_TRANSACTIONS_QUERY = `
  query ListTransactions {
    transactions {
      id
      description
      amountCents
      type
      date
      category {
        id
        name
        color
      }
    }
  }
`;

export const LIST_TRANSACTIONS_QUERY_KEY = ['transactions'] as const;

export function useListTransactions() {
	return useQuery({
		queryKey: LIST_TRANSACTIONS_QUERY_KEY,
		queryFn: graphqlRequest<ListTransactionsResponse, undefined>(
			LIST_TRANSACTIONS_QUERY,
		),
		select: (data) => data.transactions,
	});
}
