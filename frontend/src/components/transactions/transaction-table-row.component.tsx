import { SquarePen, Trash } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { Tag } from '@/components/tag';
import { TypeTag } from '@/components/type-tag';
import type { TransactionData } from './transactions.types';

interface TransactionTableRowProps {
	transaction: TransactionData;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
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
		<div className="flex items-center border-financy-gray-200 border-b last:border-b-0">
			{/* Description Cell */}
			<div className="flex h-[72px] flex-1 items-center gap-4 px-6 py-0">
				<div
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
					style={{ backgroundColor: iconBgColor }}
				/>
				<span className="font-medium text-base text-financy-gray-800">
					{description}
				</span>
			</div>

			{/* Date Cell */}
			<div className="flex h-[72px] w-28 items-center justify-center px-6">
				<span className="text-financy-gray-600 text-sm">{date}</span>
			</div>

			{/* Category Cell */}
			<div className="flex h-[72px] w-[200px] items-center justify-center px-6">
				<Tag color={categoryColor}>{category}</Tag>
			</div>

			{/* Type Cell */}
			<div className="flex h-[72px] w-[136px] items-center justify-center px-6">
				<TypeTag type={type} />
			</div>

			{/* Amount Cell */}
			<div className="flex h-[72px] w-[200px] items-center justify-end px-6">
				<span className="font-semibold text-financy-gray-800 text-sm">
					{isIncome ? '+' : '-'} {amount}
				</span>
			</div>

			{/* Actions Cell */}
			<div className="flex h-[72px] w-[120px] items-center justify-center gap-2 px-6">
				<IconButton
					icon={<SquarePen className="h-4 w-4" />}
					variant="outline"
					onClick={() => onEdit?.(id)}
					aria-label="Editar transação"
				/>
				<IconButton
					icon={<Trash className="h-4 w-4" />}
					variant="danger"
					onClick={() => onDelete?.(id)}
					aria-label="Excluir transação"
				/>
			</div>
		</div>
	);
};
