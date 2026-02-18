import type { LucideIcon } from 'lucide-react';
import type { BadgeVariants } from '@/components/ui/badge';
import type { TransactionType } from '@/types/domain/transaction';

export interface TransactionRowView {
	id: string;
	description: string;
	date: string;
	category: {
		name: string;
		icon: LucideIcon;
		color: NonNullable<BadgeVariants['color']>;
	};
	amount: number;
	type: TransactionType;
}
