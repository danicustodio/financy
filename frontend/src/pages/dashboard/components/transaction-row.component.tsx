import type { LucideIcon } from 'lucide-react';
import { AmountIndicator } from '@/components/amount-indicator';
import { IconTile } from '@/components/icon-tile';
import { Badge, type BadgeVariants } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { TransactionType } from '@/types/transaction';

interface TransactionRowProps {
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

export const TransactionRow = ({
	description,
	date,
	category,
	amount,
	type,
}: TransactionRowProps) => {
	return (
		<>
			<div className="flex items-center justify-between gap-9 px-6 py-4">
				<div className="flex flex-1 gap-4">
					<IconTile icon={category.icon} color={category.color} />
					<div className="flex flex-col">
						<span className="font-medium text-base text-financy-gray-800">
							{description}
						</span>
						<span className="text-financy-gray-600 text-sm">{date}</span>
					</div>
				</div>

				<div>
					<Badge color={category.color}>{category.name}</Badge>
				</div>

				<AmountIndicator amount={amount} type={type} />
			</div>
			<Separator className="bg-financy-gray-200" />
		</>
	);
};
