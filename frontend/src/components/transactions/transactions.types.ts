import type { TagVariants } from '@/components/tag';

export interface TransactionData {
	id: number;
	description: string;
	date: string;
	category: string;
	categoryColor: NonNullable<TagVariants['color']>;
	amount: string;
	type: 'income' | 'expense';
	iconBgColor: string;
}
