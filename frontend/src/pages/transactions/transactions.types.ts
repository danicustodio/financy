import type { TagVariants } from '@/components/tag';
import type { TransactionType } from '@/types/transaction';

export interface TransactionData {
	id: string;
	description: string;
	date: string;
	category: string;
	categoryColor: NonNullable<TagVariants['color']>;
	amount: number;
	type: TransactionType;
	iconBgColor: string;
}
