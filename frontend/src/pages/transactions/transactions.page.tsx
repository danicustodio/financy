import { ChevronDown, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { LabelButton } from '@/components/label-button';
import { NewTransactionModal } from '@/components/new-transaction-modal';
import { TransactionsTable } from '@/components/transactions';
import { MOCK_TRANSACTIONS } from './transactions.mock';

export function Transactions() {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;
	const totalResults = 27;
	const totalPages = Math.ceil(totalResults / pageSize);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<main className="p-12 flex flex-col gap-8">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-0.5">
						<h1 className="text-2xl font-bold text-financy-gray-800">
							Transações
						</h1>
						<p className="text-base text-financy-gray-600">
							Gerencie todas as suas transações financeiras
						</p>
					</div>
					<LabelButton
						variant="default"
						size="sm"
						icon={<Plus className="w-4 h-4" />}
						onClick={() => setIsModalOpen(true)}
					>
						Nova transação
					</LabelButton>
				</div>

				{/* Filters Section */}
				<div className="flex gap-4 bg-white border border-financy-gray-200 rounded-xl p-5 px-6">
					{/* Search Input */}
					<div className="flex flex-col gap-2 flex-1">
						<label
							htmlFor="search"
							className="text-sm font-medium text-financy-gray-700"
						>
							Buscar
						</label>
						<div className="flex items-center gap-3 p-3 py-3.5 w-full rounded-lg bg-financy-white border border-financy-gray-300">
							<Search className="w-4 h-4 text-financy-gray-400" />
							<input
								type="text"
								id="search"
								placeholder="Buscar por descrição"
								className="flex-1 text-base bg-transparent outline-none placeholder:text-financy-gray-400"
							/>
						</div>
					</div>

					{/* Type Select */}
					<div className="flex flex-col gap-2 flex-1">
						<label
							htmlFor="type"
							className="text-sm font-medium text-financy-gray-700"
						>
							Tipo
						</label>
						<div className="flex items-center justify-between gap-3 p-3 py-3.5 w-full rounded-lg bg-financy-white border border-financy-gray-300 cursor-pointer">
							<span className="text-base text-financy-gray-800">Todos</span>
							<ChevronDown className="w-4 h-4 text-financy-gray-400" />
						</div>
					</div>

					{/* Category Select */}
					<div className="flex flex-col gap-2 flex-1">
						<label
							htmlFor="category"
							className="text-sm font-medium text-financy-gray-700"
						>
							Categoria
						</label>
						<div className="flex items-center justify-between gap-3 p-3 py-3.5 w-full rounded-lg bg-financy-white border border-financy-gray-300 cursor-pointer">
							<span className="text-base text-financy-gray-800">Todas</span>
							<ChevronDown className="w-4 h-4 text-financy-gray-400" />
						</div>
					</div>

					{/* Period Select */}
					<div className="flex flex-col gap-2 flex-1">
						<label
							htmlFor="period"
							className="text-sm font-medium text-financy-gray-700"
						>
							Período
						</label>
						<div className="flex items-center justify-between gap-3 p-3 py-3.5 w-full rounded-lg bg-financy-white border border-financy-gray-300 cursor-pointer">
							<span className="text-base text-financy-gray-800">
								Novembro / 2025
							</span>
							<ChevronDown className="w-4 h-4 text-financy-gray-400" />
						</div>
					</div>
				</div>

				{/* Transactions Table */}
				<TransactionsTable
					transactions={MOCK_TRANSACTIONS}
					currentPage={currentPage}
					totalPages={totalPages}
					totalResults={totalResults}
					pageSize={pageSize}
					onPageChange={handlePageChange}
				/>
			</main>

			<NewTransactionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
}
