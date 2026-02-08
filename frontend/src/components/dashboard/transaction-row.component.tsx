import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import type { TagVariants } from '@/components/tag';
import { Tag } from '@/components/tag';

interface TransactionRowProps {
	description: string;
	date: string;
	category: string;
	categoryColor: NonNullable<TagVariants['color']>;
	amount: string;
	type: 'income' | 'expense';
	iconBgColor: string;
}

export const TransactionRow = ({
	description,
	date,
	category,
	categoryColor,
	amount,
	type,
	iconBgColor,
}: TransactionRowProps) => {
	const isIncome = type === 'income';
	const ArrowIcon = isIncome ? CircleArrowUp : CircleArrowDown;

	return (
		<div className="flex items-center border-b border-financy-gray-200 last:border-b-0">
			{/* Description Cell */}
			<div className="flex items-center gap-4 flex-1 px-6 py-5">
				<div
					className="w-10 h-10 rounded-lg flex items-center justify-center"
					style={{ backgroundColor: iconBgColor }}
				/>
				<div className="flex flex-col gap-0.5">
					<span className="text-base font-medium text-financy-gray-800">
						{description}
					</span>
					<span className="text-sm text-financy-gray-600">{date}</span>
				</div>
			</div>

			{/* Category Cell */}
			<div className="flex items-center justify-center w-40 px-6 py-5">
				<Tag color={categoryColor}>{category}</Tag>
			</div>

			{/* Amount Cell */}
			<div className="flex items-center justify-end gap-2 w-40 px-6 py-5">
				<span className="text-sm font-semibold text-financy-gray-800">
					{isIncome ? '+' : '-'} {amount}
				</span>
				<ArrowIcon
					className={`w-4 h-4 ${isIncome ? 'text-financy-green-base' : 'text-financy-danger'}`}
				/>
			</div>
		</div>
	);
};
