import { ChevronDown, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { LabelButton } from '@/components/label-button';
import { Navbar } from '@/components/navbar';
import { NewTransactionModal } from '@/components/new-transaction-modal';
import {
	type TransactionData,
	TransactionsTable,
} from '@/components/transactions';

// Sample data for transactions
const sampleTransactions: TransactionData[] = [
	{
		id: 1,
		description: 'Jantar no Restaurante',
		date: '30/11/25',
		category: 'Alimentação',
		categoryColor: 'blue',
		amount: 'R$ 89,50',
		type: 'expense',
		iconBgColor: '#DBEAFE',
	},
	{
		id: 2,
		description: 'Posto de Gasolina',
		date: '29/11/25',
		category: 'Transporte',
		categoryColor: 'purple',
		amount: 'R$ 100,00',
		type: 'expense',
		iconBgColor: '#F3E8FF',
	},
	{
		id: 3,
		description: 'Compras no Mercado',
		date: '28/11/25',
		category: 'Mercado',
		categoryColor: 'orange',
		amount: 'R$ 156,80',
		type: 'expense',
		iconBgColor: '#FFEDD5',
	},
	{
		id: 4,
		description: 'Retorno de Investimento',
		date: '26/11/25',
		category: 'Investimento',
		categoryColor: 'green',
		amount: 'R$ 340,25',
		type: 'income',
		iconBgColor: '#E0FAE9',
	},
	{
		id: 5,
		description: 'Aluguel',
		date: '26/11/25',
		category: 'Utilidades',
		categoryColor: 'yellow',
		amount: 'R$ 1.700,00',
		type: 'expense',
		iconBgColor: '#F7F3CA',
	},
	{
		id: 6,
		description: 'Freelance',
		date: '24/11/25',
		category: 'Salário',
		categoryColor: 'green',
		amount: 'R$ 2.500,00',
		type: 'income',
		iconBgColor: '#E0FAE9',
	},
	{
		id: 7,
		description: 'Compras Jantar',
		date: '22/11/25',
		category: 'Mercado',
		categoryColor: 'orange',
		amount: 'R$ 150,00',
		type: 'expense',
		iconBgColor: '#FFEDD5',
	},
	{
		id: 8,
		description: 'Cinema',
		date: '18/12/25',
		category: 'Entretenimento',
		categoryColor: 'pink',
		amount: 'R$ 88,00',
		type: 'expense',
		iconBgColor: '#FCE7F3',
	},
];

export function TransactionsPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;
	const totalResults = 27;
	const totalPages = Math.ceil(totalResults / pageSize);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="min-h-screen bg-financy-gray-100">
			<Navbar />

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
					transactions={sampleTransactions}
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
		</div>
	);
}
