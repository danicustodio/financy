import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategorySummaryCardProps {
	icon: LucideIcon;
	value: ReactNode;
	label: string;
	accentClassName?: string;
}

export function CategorySummaryCard({
	icon: Icon,
	value,
	label,
	accentClassName,
}: CategorySummaryCardProps) {
	return (
		<Card className="flex-1 gap-0 border-financy-gray-200 p-0 shadow-none">
			<CardContent className="flex gap-4 p-6">
				<Icon className={cn('h-8 w-8', accentClassName)} />
				<div className="flex flex-col gap-2">
					<span className="font-bold text-[28px] text-financy-gray-800 leading-none">
						{value}
					</span>
					<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
						{label}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
