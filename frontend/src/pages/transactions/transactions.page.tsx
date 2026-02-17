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
import { useListCategories } from '@/hooks/queries/use-list-categories';
import { useListTransactions } from '@/hooks/queries/use-list-transactions';
import { toTransactionTableView } from '@/mappers/domain-to-view/transaction.domain-to-view.mapper';
import { TransactionsTable } from './transactions-table.component';

const PAGE_SIZE = 10;

const MONTH_NAMES = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
];

function generatePeriodOptions() {
	const now = new Date();
	const options: { value: string; label: string }[] = [];
	for (let i = 0; i < 12; i++) {
		const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const value = `${year}-${String(month).padStart(2, '0')}`;
		const label = `${MONTH_NAMES[date.getMonth()]} / ${year}`;
		options.push({ value, label });
	}
	return options;
}

const PERIOD_OPTIONS = generatePeriodOptions();

function parsePeriod(period: string): { month: number; year: number } {
	const [year, month] = period.split('-').map(Number);
	return { month, year };
}

export function Transactions() {
	const [search, setSearch] = useState('');
	const [type, setType] = useState('all');
	const [categoryId, setCategoryId] = useState('all');
	const [period, setPeriod] = useState(PERIOD_OPTIONS[0].value);
	const [currentPage, setCurrentPage] = useState(1);

	const { month, year } = parsePeriod(period);

	const filter = {
		...(search.trim() !== '' && { search: search.trim() }),
		...(type !== 'all' && { type }),
		...(categoryId !== 'all' && { categoryId }),
		month,
		year,
	};

	const { data, isLoading } = useListTransactions({
		filter,
		pagination: { page: currentPage, pageSize: PAGE_SIZE },
	});

	const { data: categories = [] } = useListCategories();

	const totalCount = data?.totalCount ?? 0;
	const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
	const tableRows = useMemo(
		() => (data?.items ?? []).map(toTransactionTableView),
		[data],
	);

	function handleFilterChange(updater: () => void) {
		updater();
		setCurrentPage(1);
	}

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
								value={search}
								onChange={(e) =>
									handleFilterChange(() => setSearch(e.target.value))
								}
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
						<Select
							value={type}
							onValueChange={(value) =>
								handleFilterChange(() => setType(value))
							}
						>
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
						<Select
							value={categoryId}
							onValueChange={(value) =>
								handleFilterChange(() => setCategoryId(value))
							}
						>
							<SelectTrigger className="h-auto w-full rounded-lg border-financy-gray-300 bg-financy-white px-3 py-3.5 text-base text-financy-gray-800 shadow-none">
								<SelectValue placeholder="Todas" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todas</SelectItem>
								{categories.map((cat) => (
									<SelectItem key={cat.id} value={cat.id}>
										{cat.title}
									</SelectItem>
								))}
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
						<Select
							value={period}
							onValueChange={(value) =>
								handleFilterChange(() => setPeriod(value))
							}
						>
							<SelectTrigger className="h-auto w-full rounded-lg border-financy-gray-300 bg-financy-white px-3 py-3.5 text-base text-financy-gray-800 shadow-none">
								<SelectValue placeholder="Selecionar período" />
							</SelectTrigger>
							<SelectContent>
								{PERIOD_OPTIONS.map((opt) => (
									<SelectItem key={opt.value} value={opt.value}>
										{opt.label}
									</SelectItem>
								))}
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
					totalResults={totalCount}
					pageSize={PAGE_SIZE}
					onPageChange={setCurrentPage}
				/>
			)}
		</main>
	);
}
