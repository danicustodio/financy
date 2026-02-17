import { SquarePen, Trash } from 'lucide-react';
import { AmountIndicator } from '@/components/amount-indicator';
import { IconButton } from '@/components/icon-button';
import { Tag } from '@/components/tag';
import { TypeTag } from '@/components/type-tag';
import { TableCell, TableRow } from '@/components/ui/table';
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
	return (
		<TableRow className="border-financy-gray-200">
			{/* Description Cell */}
			<TableCell className="h-[72px] px-6 py-0">
				<div className="flex items-center gap-4">
					<div
						className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
						style={{ backgroundColor: iconBgColor }}
					/>
					<span className="font-medium text-base text-financy-gray-800">
						{description}
					</span>
				</div>
			</TableCell>

			{/* Date Cell */}
			<TableCell className="h-[72px] w-28 px-6 text-center">
				<span className="text-financy-gray-600 text-sm">{date}</span>
			</TableCell>

			{/* Category Cell */}
			<TableCell className="h-[72px] w-[200px] px-6 text-center">
				<Tag color={categoryColor}>{category}</Tag>
			</TableCell>

			{/* Type Cell */}
			<TableCell className="h-[72px] w-[136px] px-6 text-center">
				<TypeTag type={type} />
			</TableCell>

			{/* Amount Cell */}
			<TableCell className="h-[72px] w-[200px] px-6 text-right">
				<AmountIndicator amount={amount} type={type} showIcon={false} />
			</TableCell>

			{/* Actions Cell */}
			<TableCell className="h-[72px] w-[120px] px-6">
				<div className="flex items-center justify-center gap-2">
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
			</TableCell>
		</TableRow>
	);
};
