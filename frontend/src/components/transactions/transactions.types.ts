import type { TagVariants } from '@/components/tag';

export interface TransactionData {
	id: string;
	description: string;
	date: string;
	category: string;
	categoryColor: NonNullable<TagVariants['color']>;
	amount: number;
	type: 'income' | 'expense';
	iconBgColor: string;
}
