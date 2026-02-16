import { BriefcaseBusiness } from 'lucide-react';
import { IconTile } from '@/components/icon-tile';
import type { TagVariants } from '@/components/tag';
import { Tag } from '@/components/tag';
import { AmountIndicator } from './amount-indicator.component';

interface TransactionRowProps {
	description: string;
	date: string;
	category: string;
	categoryColor: NonNullable<TagVariants['color']>;
	amount: string;
	type: 'income' | 'expense';
}

export const TransactionRow = ({
	description,
	date,
	category,
	categoryColor,
	amount,
	type,
}: TransactionRowProps) => {
	return (
		<div className="flex items-center justify-between gap-9 border-financy-gray-200 border-b px-6 py-4">
			<div className="flex flex-1 gap-4">
				<IconTile icon={BriefcaseBusiness} />
				<div className="flex flex-col">
					<span className="font-medium text-base text-financy-gray-800">
						{description}
					</span>
					<span className="text-financy-gray-600 text-sm">{date}</span>
				</div>
			</div>

			<div className="">
				<Tag color={categoryColor}>{category}</Tag>
			</div>

			<AmountIndicator amount={amount} type={type} />
		</div>
	);
};
