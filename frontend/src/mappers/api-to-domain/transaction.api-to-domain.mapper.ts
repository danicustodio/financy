import type { ListTransactionsResponse } from '@/types/api/operations';
import type { Transaction } from '@/types/domain/transaction';
import {
	toCategoryColor,
	toCategoryIconName,
} from './category.api-to-domain.mapper';

export function mapApiTransactionToDomain(
	transaction: ListTransactionsResponse['transactions']['items'][number],
): Transaction {
	return {
		...transaction,
		category: {
			...transaction.category,
			icon: toCategoryIconName(transaction.category.icon),
			color: toCategoryColor(transaction.category.color),
		},
	};
}
