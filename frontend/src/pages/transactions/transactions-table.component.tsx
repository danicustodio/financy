import { Pagination } from '@/components/pagination';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import type { TransactionData } from './transactions.types';
import { TransactionTableRow } from './transaction-table-row.component';

interface TransactionsTableProps {
	transactions: TransactionData[];
	currentPage: number;
	totalPages: number;
	totalResults: number;
	pageSize: number;
	onPageChange?: (page: number) => void;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
}

export const TransactionsTable = ({
	transactions,
	currentPage,
	totalPages,
	totalResults,
	pageSize,
	onPageChange,
	onEdit,
	onDelete,
}: TransactionsTableProps) => {
	return (
		<div className="overflow-hidden rounded-xl border border-financy-gray-200 bg-white">
			<Table>
				<TableHeader>
					<TableRow className="border-financy-gray-200 hover:bg-transparent">
						<TableHead className="h-auto flex-1 px-6 py-5 font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
							Descrição
						</TableHead>
						<TableHead className="h-auto w-28 px-6 py-5 text-center font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
							Data
						</TableHead>
						<TableHead className="h-auto w-[200px] px-6 py-5 text-center font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
							Categoria
						</TableHead>
						<TableHead className="h-auto w-[136px] px-6 py-5 text-center font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
							Tipo
						</TableHead>
						<TableHead className="h-auto w-[200px] px-6 py-5 text-right font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
							Valor
						</TableHead>
						<TableHead className="h-auto w-[120px] px-6 py-5 text-center font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
							Ações
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{transactions.map((transaction) => (
						<TransactionTableRow
							key={transaction.id}
							transaction={transaction}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					))}
				</TableBody>
			</Table>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				totalResults={totalResults}
				pageSize={pageSize}
				onPageChange={onPageChange}
			/>
		</div>
	);
};
