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
		<div className="bg-white border border-financy-gray-200 rounded-xl overflow-hidden">
			{/* Table Header */}
			<div className="flex items-center border-b border-financy-gray-200">
				<div className="flex-1 px-6 py-5">
					<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
						Descrição
					</span>
				</div>
				<div className="flex items-center justify-center w-28 px-6 py-5">
					<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
						Data
					</span>
				</div>
				<div className="flex items-center justify-center w-[200px] px-6 py-5">
					<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
						Categoria
					</span>
				</div>
				<div className="flex items-center justify-center w-[136px] px-6 py-5">
					<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
						Tipo
					</span>
				</div>
				<div className="flex items-center justify-end w-[200px] px-6 py-5">
					<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
						Valor
					</span>
				</div>
				<div className="flex items-center justify-end w-[120px] px-6 py-5">
					<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
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
