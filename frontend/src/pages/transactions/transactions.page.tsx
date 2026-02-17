import { Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CreateTransactionModal } from '@/components/create-transaction-modal';
import { LabelButton } from '@/components/label-button';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useListTransactions } from '@/hooks/queries/use-list-transactions';
import { toTransactionTableView } from '@/mappers/domain-to-view/transaction.domain-to-view.mapper';
import { TransactionsTable } from './transactions-table.component';

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

	const tableRows = useMemo(
		() => currentPageTransactions.map(toTransactionTableView),
		[currentPageTransactions],
	);

	return (
		<main className="m-auto flex max-w-7xl flex-col gap-8 p-12">
			<PageHeader
				title="Transações"
				subtitle="Gerencie todas as suas transações financeiras"
				action={
					<CreateTransactionModal>
						<LabelButton
							variant="default"
							size="sm"
							icon={<Plus className="h-4 w-4" />}
						>
							Nova transação
						</LabelButton>
					</CreateTransactionModal>
				}
			/>

			{/* Filters Section */}
			<Card className="border-financy-gray-200 p-0 shadow-none">
				<CardContent className="flex gap-4 px-6 py-5">
					{/* Search Input */}
					<div className="flex flex-1 flex-col gap-2">
						<Label
							htmlFor="search"
							className="font-medium text-financy-gray-700 text-sm"
						>
							Buscar
						</Label>
						<div className="relative">
							<Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-financy-gray-400" />
							<Input
								type="text"
								id="search"
								placeholder="Buscar por descrição"
								className="h-auto rounded-lg border-financy-gray-300 bg-financy-white py-3.5 pl-10 text-base shadow-none placeholder:text-financy-gray-400"
							/>
						</div>
					</div>

					{/* Type Select */}
					<div className="flex flex-1 flex-col gap-2">
						<Label
							htmlFor="type"
							className="font-medium text-financy-gray-700 text-sm"
						>
							Tipo
						</Label>
						<Select defaultValue="all">
							<SelectTrigger className="h-auto w-full rounded-lg border-financy-gray-300 bg-financy-white px-3 py-3.5 text-base text-financy-gray-800 shadow-none">
								<SelectValue placeholder="Todos" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos</SelectItem>
								<SelectItem value="income">Receita</SelectItem>
								<SelectItem value="expense">Despesa</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Category Select */}
					<div className="flex flex-1 flex-col gap-2">
						<Label
							htmlFor="category"
							className="font-medium text-financy-gray-700 text-sm"
						>
							Categoria
						</Label>
						<Select defaultValue="all">
							<SelectTrigger className="h-auto w-full rounded-lg border-financy-gray-300 bg-financy-white px-3 py-3.5 text-base text-financy-gray-800 shadow-none">
								<SelectValue placeholder="Todas" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todas</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Period Select */}
					<div className="flex flex-1 flex-col gap-2">
						<Label
							htmlFor="period"
							className="font-medium text-financy-gray-700 text-sm"
						>
							Período
						</Label>
						<Select defaultValue="2025-11">
							<SelectTrigger className="h-auto w-full rounded-lg border-financy-gray-300 bg-financy-white px-3 py-3.5 text-base text-financy-gray-800 shadow-none">
								<SelectValue placeholder="Selecionar período" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="2025-11">Novembro / 2025</SelectItem>
								<SelectItem value="2025-12">Dezembro / 2025</SelectItem>
								<SelectItem value="2026-01">Janeiro / 2026</SelectItem>
								<SelectItem value="2026-02">Fevereiro / 2026</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

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
