import { ChevronDown, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CreateTransactionModal } from '@/components/create-transaction-modal';
import { LabelButton } from '@/components/label-button';
import {
	type TransactionData,
	TransactionsTable,
} from '@/components/transactions';
import {
	formatAmountFromCents,
	formatDate,
	iconBackgroundColor,
	toCategoryColor,
} from '@/mappers/listing.mapper';
import { useListTransactions } from '@/hooks/queries/use-list-transactions';

export function Transactions() {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const { data: transactions = [], isLoading } = useListTransactions();

	const totalResults = transactions.length;
	const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

	const currentPageTransactions = useMemo(
		() =>
			transactions.slice(
				(currentPage - 1) * pageSize,
				(currentPage - 1) * pageSize + pageSize,
			),
		[transactions, currentPage],
	);

	const tableRows = useMemo<TransactionData[]>(
		() =>
			currentPageTransactions.map((transaction) => ({
				id: transaction.id,
				description: transaction.description,
				date: formatDate(transaction.date),
				category: transaction.category.name,
				categoryColor: toCategoryColor(transaction.category.color),
				amount: formatAmountFromCents(transaction.amountCents),
				type: transaction.type,
				iconBgColor: iconBackgroundColor(transaction.category.color),
			})),
		[currentPageTransactions],
	);

	return (
		<main className="flex flex-col gap-8 p-12">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-0.5">
						<h1 className="font-bold text-2xl text-financy-gray-800">
							Transações
						</h1>
						<p className="text-base text-financy-gray-600">
							Gerencie todas as suas transações financeiras
						</p>
					</div>
					<CreateTransactionModal>
						<LabelButton
							variant="default"
							size="sm"
							icon={<Plus className="h-4 w-4" />}
						>
							Nova transação
						</LabelButton>
					</CreateTransactionModal>
				</div>

				{/* Filters Section */}
				<div className="flex gap-4 rounded-xl border border-financy-gray-200 bg-white p-5 px-6">
					{/* Search Input */}
					<div className="flex flex-1 flex-col gap-2">
						<label
							htmlFor="search"
							className="font-medium text-financy-gray-700 text-sm"
						>
							Buscar
						</label>
						<div className="flex w-full items-center gap-3 rounded-lg border border-financy-gray-300 bg-financy-white p-3 py-3.5">
							<Search className="h-4 w-4 text-financy-gray-400" />
							<input
								type="text"
								id="search"
								placeholder="Buscar por descrição"
								className="flex-1 bg-transparent text-base outline-none placeholder:text-financy-gray-400"
							/>
						</div>
					</div>

					{/* Type Select */}
					<div className="flex flex-1 flex-col gap-2">
						<label
							htmlFor="type"
							className="font-medium text-financy-gray-700 text-sm"
						>
							Tipo
						</label>
						<div className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-financy-gray-300 bg-financy-white p-3 py-3.5">
							<span className="text-base text-financy-gray-800">Todos</span>
							<ChevronDown className="h-4 w-4 text-financy-gray-400" />
						</div>
					</div>

					{/* Category Select */}
					<div className="flex flex-1 flex-col gap-2">
						<label
							htmlFor="category"
							className="font-medium text-financy-gray-700 text-sm"
						>
							Categoria
						</label>
						<div className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-financy-gray-300 bg-financy-white p-3 py-3.5">
							<span className="text-base text-financy-gray-800">Todas</span>
							<ChevronDown className="h-4 w-4 text-financy-gray-400" />
						</div>
					</div>

					{/* Period Select */}
					<div className="flex flex-1 flex-col gap-2">
						<label
							htmlFor="period"
							className="font-medium text-financy-gray-700 text-sm"
						>
							Período
						</label>
						<div className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-financy-gray-300 bg-financy-white p-3 py-3.5">
							<span className="text-base text-financy-gray-800">
								Novembro / 2025
							</span>
							<ChevronDown className="h-4 w-4 text-financy-gray-400" />
						</div>
					</div>
				</div>

				{/* Transactions Table */}
				{isLoading ? (
					<div className="rounded-xl border border-financy-gray-200 bg-white p-8 text-center text-financy-gray-600 text-sm">
						Carregando transações...
					</div>
				) : (
					<TransactionsTable
						transactions={tableRows}
						currentPage={currentPage}
						totalPages={totalPages}
						totalResults={totalResults}
						pageSize={pageSize}
						onPageChange={handlePageChange}
					/>
				)}
			</main>
	);
}
