import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CreateTransactionModal } from '@/components/create-transaction-modal';
import { LabelButton } from '@/components/label-button';
import { PageHeader } from '@/components/page-header';
import { useListCategories } from '@/hooks/queries/use-list-categories';
import { useListTransactions } from '@/hooks/queries/use-list-transactions';
import { toTransactionRowView } from '@/mappers/domain-to-view/transaction.domain-to-view.mapper';
import {
	PERIOD_OPTIONS,
	TransactionsFilterBar,
} from './components/transactions-filter-bar.component';
import { TransactionsTable } from './components/transactions-table.component';

const PAGE_SIZE = 10;

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
		() => (data?.items ?? []).map(toTransactionRowView),
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

			<TransactionsFilterBar
				search={search}
				onSearchChange={(value) => handleFilterChange(() => setSearch(value))}
				type={type}
				onTypeChange={(value) => handleFilterChange(() => setType(value))}
				categoryId={categoryId}
				onCategoryIdChange={(value) =>
					handleFilterChange(() => setCategoryId(value))
				}
				period={period}
				onPeriodChange={(value) => handleFilterChange(() => setPeriod(value))}
				categories={categories}
			/>

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
