import { SquarePen, Trash } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { Tag } from '@/components/tag';
import { TypeTag } from '@/components/type-tag';
import type { TransactionData } from './transactions.types';

interface TransactionTableRowProps {
	transaction: TransactionData;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
}

export const TransactionTableRow = ({
	transaction,
	onEdit,
	onDelete,
}: TransactionTableRowProps) => {
	const {
		id,
		description,
		date,
		category,
		categoryColor,
		amount,
		type,
		iconBgColor,
	} = transaction;
	const isIncome = type === 'income';

	return (
		<div className="flex items-center border-b border-financy-gray-200 last:border-b-0">
			{/* Description Cell */}
			<div className="flex items-center gap-4 flex-1 px-6 py-0 h-[72px]">
				<div
					className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
					style={{ backgroundColor: iconBgColor }}
				/>
				<span className="text-base font-medium text-financy-gray-800">
					{description}
				</span>
			</div>

			{/* Date Cell */}
			<div className="flex items-center justify-center w-28 px-6 h-[72px]">
				<span className="text-sm text-financy-gray-600">{date}</span>
			</div>

			{/* Category Cell */}
			<div className="flex items-center justify-center w-[200px] px-6 h-[72px]">
				<Tag color={categoryColor}>{category}</Tag>
			</div>

			{/* Type Cell */}
			<div className="flex items-center justify-center w-[136px] px-6 h-[72px]">
				<TypeTag type={type} />
			</div>

			{/* Amount Cell */}
			<div className="flex items-center justify-end w-[200px] px-6 h-[72px]">
				<span className="text-sm font-semibold text-financy-gray-800">
					{isIncome ? '+' : '-'} {amount}
				</span>
			</div>

			{/* Actions Cell */}
			<div className="flex items-center justify-center gap-2 w-[120px] px-6 h-[72px]">
				<IconButton
					icon={<SquarePen className="w-4 h-4" />}
					variant="outline"
					onClick={() => onEdit?.(id)}
					aria-label="Editar transação"
				/>
				<IconButton
					icon={<Trash className="w-4 h-4" />}
					variant="danger"
					onClick={() => onDelete?.(id)}
					aria-label="Excluir transação"
				/>
			</div>
		</div>
	);
};
