import { Pagination } from '@/components/pagination';
import { TransactionTableRow } from './transaction-table-row.component';
import type { TransactionData } from './transactions.types';

interface TransactionsTableProps {
	transactions: TransactionData[];
	currentPage: number;
	totalPages: number;
	totalResults: number;
	pageSize: number;
	onPageChange?: (page: number) => void;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
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
			{/* Table Header */}
			<div className="flex items-center border-financy-gray-200 border-b">
				<div className="flex-1 px-6 py-5">
					<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
						Descrição
					</span>
				</div>
				<div className="flex w-28 items-center justify-center px-6 py-5">
					<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
						Data
					</span>
				</div>
				<div className="flex w-[200px] items-center justify-center px-6 py-5">
					<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
						Categoria
					</span>
				</div>
				<div className="flex w-[136px] items-center justify-center px-6 py-5">
					<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
						Tipo
					</span>
				</div>
				<div className="flex w-[200px] items-center justify-end px-6 py-5">
					<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
						Valor
					</span>
				</div>
				<div className="flex w-[120px] items-center justify-end px-6 py-5">
					<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
						Ações
					</span>
				</div>
			</div>

			{/* Table Body */}
			<div>
				{transactions.map((transaction) => (
					<TransactionTableRow
						key={transaction.id}
						transaction={transaction}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				))}
			</div>

			{/* Pagination Footer */}
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
