import type { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
	icon: LucideIcon;
	label: string;
	value: string;
}

export const SummaryCard = ({ icon: Icon, label, value }: SummaryCardProps) => {
	return (
		<div className="flex flex-col gap-4 bg-white border border-financy-gray-200 rounded-xl p-6 flex-1">
			<div className="flex items-center gap-3">
				<Icon className="w-5 h-5 text-financy-brand-base" />
				<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
					{label}
				</span>
			</div>
			<span className="text-[28px] font-bold text-financy-gray-800">
				{value}
			</span>
		</div>
	);
};
