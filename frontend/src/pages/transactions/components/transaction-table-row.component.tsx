import { SquarePen, Trash } from 'lucide-react';
import { AmountIndicator } from '@/components/amount-indicator';
import { IconButton } from '@/components/icon-button';
import { IconTile } from '@/components/icon-tile';
import { TypeTag } from '@/components/type-tag';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import type { TransactionRowView } from '@/types/view/transactions';

interface TransactionTableRowProps {
	transaction: TransactionRowView;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
}

export const TransactionTableRow = ({
	transaction,
	onEdit,
	onDelete,
}: TransactionTableRowProps) => {
	const { id, description, date, category, amount, type } = transaction;
	return (
		<TableRow className="border-financy-gray-200">
			<TableCell className="h-18 px-6 py-0">
				<div className="flex items-center gap-4">
					<IconTile icon={category.icon} color={category.color} />
					<div className="flex flex-col">
						<span className="font-medium text-base text-financy-gray-800">
							{description}
						</span>
					</div>
				</div>
			</TableCell>

			<TableCell className="h-18 w-28 px-6 text-center">
				<span className="text-financy-gray-600 text-sm">{date}</span>
			</TableCell>

			<TableCell className="h-18 w-50 px-6 text-center">
				<Badge color={category.color}>{category.name}</Badge>
			</TableCell>

			<TableCell className="h-18 w-34 px-6 text-center">
				<TypeTag type={type} />
			</TableCell>

			<TableCell className="h-18 w-50 px-6 text-right">
				<AmountIndicator amount={amount} type={type} showIcon={false} />
			</TableCell>

			<TableCell className="h-18 w-30 px-6">
				<div className="flex items-center justify-center gap-2">
					<IconButton
						icon={<Trash className="h-4 w-4 text-financy-danger" />}
						onClick={() => onDelete?.(id)}
						aria-label="Excluir transação"
					/>
					<IconButton
						icon={<SquarePen className="h-4 w-4" />}
						variant="outline"
						onClick={() => onEdit?.(id)}
						aria-label="Editar transação"
					/>
				</div>
			</TableCell>
		</TableRow>
	);
};
