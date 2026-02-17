import type { LucideIcon } from 'lucide-react';
import type { TagVariants } from '@/components/tag';
import type { TransactionType } from '@/types/domain/transaction';

export interface TransactionTableView {
	id: string;
	description: string;
	date: string;
	category: string;
	categoryColor: NonNullable<TagVariants['color']>;
	amount: number;
	type: TransactionType;
	iconBgColor: string;
}

export interface TransactionRowView {
	id: string;
	description: string;
	date: string;
	category: {
		name: string;
		icon: LucideIcon;
		color: NonNullable<TagVariants['color']>;
	};
	amount: number;
	type: TransactionType;
}
