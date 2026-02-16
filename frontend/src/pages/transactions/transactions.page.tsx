import { ChevronDown, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { LabelButton } from '@/components/label-button';
import { NewTransactionModal } from '@/components/new-transaction-modal';
import { TransactionsTable } from '@/components/transactions';
import {
	useCategories,
	useCreateTransactionForm,
} from '@/features/transactions/create-transaction';
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

	const { categories } = useCategories();
	const { form, formError, isSubmitting, onSubmit } = useCreateTransactionForm(
		() => {
			setIsModalOpen(false);
			form.reset();
		},
	);

	return (
		<>
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
					<LabelButton
						variant="default"
						size="sm"
						icon={<Plus className="h-4 w-4" />}
						onClick={() => setIsModalOpen(true)}
					>
						Nova transação
					</LabelButton>
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
				form={form}
				categories={categories}
				formError={formError}
				isSubmitting={isSubmitting}
				onSubmit={onSubmit}
			/>
		</>
	);
}
