import { BriefcaseBusiness } from 'lucide-react';
import { IconTile } from '@/components/icon-tile';
import { Tag } from '@/components/tag';
import { AmountIndicator } from './amount-indicator.component';

interface TransactionRowProps {
	description: string;
	date: string;
}

export const TransactionRow = ({ description, date }: TransactionRowProps) => {
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
				<Tag color="green">Receita</Tag>
			</div>

			<AmountIndicator amount="R$ 4.250,00" type="income" />
		</div>
	);
};
