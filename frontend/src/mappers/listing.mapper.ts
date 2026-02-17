import {
	BaggageClaim,
	BookOpen,
	BriefcaseBusiness,
	CarFront,
	Dumbbell,
	Gift,
	HeartPulse,
	House,
	type LucideIcon,
	Mailbox,
	PawPrint,
	PiggyBank,
	ReceiptText,
	ShoppingCart,
	Ticket,
	Utensils,
	Wrench,
} from 'lucide-react';
import type { CategoryColor } from '@/pages/categories/components/category-card.component';

const categoryIconMap: Record<string, LucideIcon> = {
	'briefcase-business': BriefcaseBusiness,
	'car-front': CarFront,
	'heart-pulse': HeartPulse,
	'piggy-bank': PiggyBank,
	'shopping-cart': ShoppingCart,
	ticket: Ticket,
	wrench: Wrench,
	utensils: Utensils,
	'paw-print': PawPrint,
	house: House,
	gift: Gift,
	dumbbell: Dumbbell,
	'book-open': BookOpen,
	'baggage-claim': BaggageClaim,
	mailbox: Mailbox,
	'receipt-text': ReceiptText,
};

const categoryColorFallback: CategoryColor = 'blue';

const iconBackgroundByColor: Record<CategoryColor, string> = {
	blue: '#DBEAFE',
	purple: '#F3E8FF',
	yellow: '#F7F3CA',
	pink: '#FCE7F3',
	green: '#E0FAE9',
	orange: '#FFEDD5',
	red: '#FEE2E2',
};

const shortDateFormatter = new Intl.DateTimeFormat('pt-BR', {
	day: '2-digit',
	month: '2-digit',
	year: '2-digit',
});

export function toCategoryColor(color: string): CategoryColor {
	switch (color) {
		case 'blue':
		case 'purple':
		case 'yellow':
		case 'pink':
		case 'green':
		case 'orange':
		case 'red':
			return color;
		default:
			return categoryColorFallback;
	}
}

export function formatDate(value: string): string {
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? '' : shortDateFormatter.format(date);
}

export function iconBackgroundColor(color: string): string {
	return iconBackgroundByColor[toCategoryColor(color)];
}

export function toCategoryIcon(icon: string): LucideIcon {
	return categoryIconMap[icon] ?? BriefcaseBusiness;
}

export interface TransactionTableView {
	id: string;
	description: string;
	date: string;
	category: string;
	categoryColor: CategoryColor;
	amount: number;
	type: import('@/types/transaction').TransactionType;
	iconBgColor: string;
}

export interface TransactionRowView {
	id: string;
	description: string;
	date: string;
	category: {
		name: string;
		icon: LucideIcon;
		color: CategoryColor;
	};
	amount: number;
	type: import('@/types/transaction').TransactionType;
}

interface MappableTransaction {
	id: string;
	description: string;
	amount: number;
	type: import('@/types/transaction').TransactionType;
	date: string;
	category: {
		id: string;
		name: string;
		icon: string;
		color: string;
	};
}

export function toTransactionTableView(
	transaction: MappableTransaction,
): TransactionTableView {
	return {
		id: transaction.id,
		description: transaction.description,
		date: formatDate(transaction.date),
		category: transaction.category.name,
		categoryColor: toCategoryColor(transaction.category.color),
		amount: transaction.amount,
		type: transaction.type,
		iconBgColor: iconBackgroundColor(transaction.category.color),
	};
}

export function toTransactionRowView(
	transaction: MappableTransaction,
): TransactionRowView {
	return {
		id: transaction.id,
		description: transaction.description,
		date: formatDate(transaction.date),
		category: {
			name: transaction.category.name,
			icon: toCategoryIcon(transaction.category.icon),
			color: toCategoryColor(transaction.category.color),
		},
		amount: transaction.amount,
		type: transaction.type,
	};
}
