import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardSummary } from '@/hooks/queries/use-dashboard-summary';
import { useListCategories } from '@/hooks/queries/use-list-categories';
import { useListTransactions } from '@/hooks/queries/use-list-transactions';
import { presentAmount } from '@/mappers/amount.mapper';
import {
	toCategoryColor,
	toTransactionRowView,
} from '@/mappers/listing.mapper';
import { CategoriesSection } from './components/categories-section.component';
import { RecentTransactions } from './components/recent-transactions.component';
import { SummaryCard } from './components/summary-card.component';

function DashboardSkeleton() {
	return (
		<main className="m-auto max-w-7xl p-12">
			<div className="mb-6 flex gap-6">
				<Skeleton className="h-[120px] flex-1 rounded-xl" />
				<Skeleton className="h-[120px] flex-1 rounded-xl" />
				<Skeleton className="h-[120px] flex-1 rounded-xl" />
			</div>
			<div className="flex gap-6">
				<Skeleton className="h-[400px] flex-2 rounded-xl" />
				<Skeleton className="h-[400px] flex-1 rounded-xl" />
			</div>
		</main>
	);
}

export function Dashboard() {
	const { data: categories = [] } = useListCategories();
	const { data: transactions = [], isLoading } = useListTransactions();
	const { data: summary } = useDashboardSummary();

	const recentTransactions = useMemo(
		() => transactions.slice(0, 5).map(toTransactionRowView),
		[transactions],
	);

	const categoriesSectionData = useMemo(() => {
		const totalsByCategoryId = transactions.reduce<
			Record<string, { amount: number; itemCount: number }>
		>((acc, transaction) => {
			const categoryId = transaction.category.id;
			const current = acc[categoryId] ?? { amount: 0, itemCount: 0 };
			acc[categoryId] = {
				amount: current.amount + transaction.amount,
				itemCount: current.itemCount + 1,
			};
			return acc;
		}, {});

		return categories
			.map((category) => ({
				id: category.id,
				category: {
					name: category.name,
					color: toCategoryColor(category.color),
				},
				itemCount: totalsByCategoryId[category.id]?.itemCount ?? 0,
				amount: totalsByCategoryId[category.id]?.amount ?? 0,
			}))
			.sort((first, second) => second.itemCount - first.itemCount)
			.slice(0, 5);
	}, [categories, transactions]);

	if (isLoading) {
		return <DashboardSkeleton />;
	}

	return (
		<main className="m-auto max-w-7xl p-12">
			<div className="mb-6 flex gap-6">
				<SummaryCard
					icon={Wallet}
					label="Saldo total"
					value={presentAmount(summary?.totalBalance ?? 0)}
					accentClassName="text-financy-purple-base"
				/>
				<SummaryCard
					icon={CircleArrowUp}
					label="Receitas do mês"
					value={presentAmount(summary?.monthlyIncome ?? 0)}
					accentClassName="text-financy-brand-base"
				/>
				<SummaryCard
					icon={CircleArrowDown}
					label="Despesas do mês"
					value={presentAmount(summary?.monthlyExpense ?? 0)}
					accentClassName="text-financy-red-base"
				/>
			</div>

			<div className="flex gap-6">
				<RecentTransactions transactions={recentTransactions} />
				<CategoriesSection categories={categoriesSectionData} />
			</div>
		</main>
	);
}
