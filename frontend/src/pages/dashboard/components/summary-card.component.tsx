import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface SummaryCardProps {
	icon: LucideIcon;
	label: string;
	value: string;
	className?: string;
	accentClassName?: string;
}

export const SummaryCard = ({
	label,
	value,
	icon: Icon,
	className,
	accentClassName,
}: SummaryCardProps) => {
	return (
		<Card
			className={cn(
				'flex-1 gap-4 border-financy-gray-200 bg-financy-white p-6 shadow-none',
				className,
			)}
		>
			<CardContent className="flex flex-col gap-4 p-0">
				<div className="flex items-center gap-3">
					<Icon className={cn('h-5 w-5', accentClassName)} />
					<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
						{label}
					</span>
				</div>
				<span className="font-bold text-[28px] text-financy-gray-800">
					{value}
				</span>
			</CardContent>
		</Card>
	);
};
