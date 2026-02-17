import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { presentAmount } from '@/mappers/amount.mapper';
import type { TransactionType } from '@/types/domain/transaction';

interface AmountIndicatorProps {
	amount: number;
	type: TransactionType;
	showIcon?: boolean;
	className?: string;
}

export const AmountIndicator = ({
	amount,
	type,
	showIcon = true,
	className,
}: AmountIndicatorProps) => {
	const isIncome = type === 'income';
	const Icon = isIncome ? CircleArrowUp : CircleArrowDown;

	return (
		<div className={cn('inline-flex items-center gap-2', className)}>
			<span className="font-semibold text-financy-gray-800 text-sm">
				{isIncome ? '+' : '-'} {presentAmount(amount)}
			</span>
			{showIcon && (
				<Icon
					className={cn(
						'h-4 w-4',
						isIncome ? 'text-financy-green-base' : 'text-financy-danger',
					)}
				/>
			)}
		</div>
	);
};
