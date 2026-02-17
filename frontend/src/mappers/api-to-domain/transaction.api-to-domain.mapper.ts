import type { ListTransactionsResponse } from '@/types/api/operations';
import type { Transaction } from '@/types/domain/transaction';
import {
	toCategoryColor,
	toCategoryIconName,
} from './category.api-to-domain.mapper';

export function mapApiTransactionToDomain(
	transaction: ListTransactionsResponse['transactions'][number],
): Transaction {
	return {
		id: transaction.id,
		description: transaction.description,
		amount: transaction.amount,
		type: transaction.type,
		date: transaction.date,
		category: {
			id: transaction.category.id,
			title: transaction.category.title,
			icon: toCategoryIconName(transaction.category.icon),
			color: toCategoryColor(transaction.category.color),
		},
	};
}
