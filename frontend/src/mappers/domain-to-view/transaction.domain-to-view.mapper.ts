import type { LucideIcon } from 'lucide-react';
import {
	CATEGORY_ICON_COMPONENT_BY_NAME,
	ICON_BACKGROUND_BY_COLOR,
} from '@/constants/category';
import type { Transaction } from '@/types/domain/transaction';
import type {
	TransactionRowView,
	TransactionTableView,
} from '@/types/view/transactions';

const shortDateFormatter = new Intl.DateTimeFormat('pt-BR', {
	day: '2-digit',
	month: '2-digit',
	year: '2-digit',
});

export function formatDate(value: string): string {
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? '' : shortDateFormatter.format(date);
}

export function toCategoryIcon(iconName: string): LucideIcon {
	return (
		CATEGORY_ICON_COMPONENT_BY_NAME[
			iconName as keyof typeof CATEGORY_ICON_COMPONENT_BY_NAME
		] ?? CATEGORY_ICON_COMPONENT_BY_NAME['briefcase-business']
	);
}

export function iconBackgroundColor(
	color: Transaction['category']['color'],
): string {
	return ICON_BACKGROUND_BY_COLOR[color];
}

export function toTransactionTableView(
	transaction: Transaction,
): TransactionTableView {
	return {
		id: transaction.id,
		description: transaction.description,
		date: formatDate(transaction.date),
		category: transaction.category.name,
		categoryColor: transaction.category.color,
		amount: transaction.amount,
		type: transaction.type,
		iconBgColor: iconBackgroundColor(transaction.category.color),
	};
}

export function toTransactionRowView(
	transaction: Transaction,
): TransactionRowView {
	return {
		id: transaction.id,
		description: transaction.description,
		date: formatDate(transaction.date),
		category: {
			name: transaction.category.name,
			icon: toCategoryIcon(transaction.category.icon),
			color: transaction.category.color,
		},
		amount: transaction.amount,
		type: transaction.type,
	};
}
