import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react';
import { useMemo } from 'react';
import { presentAmount } from '@/mappers/amount.mapper';
import { useListCategories } from '@/hooks/queries/use-list-categories';
import { formatDate, toCategoryColor } from '@/mappers/listing.mapper';
import { useListTransactions } from '@/hooks/queries/use-list-transactions';
import { useDashboardSummary } from '@/hooks/queries/use-dashboard-summary';
import { CategoriesSection } from './components/categories-section.component';
import { RecentTransactions } from './components/recent-transactions.component';
import { SummaryCard } from './components/summary-card.component';

export function Dashboard() {
	const { data: categories = [] } = useListCategories();
	const { data: transactions = [], isLoading } = useListTransactions();
	const { data: summary } = useDashboardSummary();

	const recentTransactions = useMemo(
		() =>
			transactions.slice(0, 5).map((transaction) => ({
				id: transaction.id,
				description: transaction.description,
				date: formatDate(transaction.date),
				category: transaction.category.name,
				categoryColor: toCategoryColor(transaction.category.color),
				amount: transaction.amount,
				type: transaction.type,
			})),
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
				category: category.name,
				categoryColor: toCategoryColor(category.color),
				itemCount: totalsByCategoryId[category.id]?.itemCount ?? 0,
				amount: totalsByCategoryId[category.id]?.amount ?? 0,
			}))
			.sort((first, second) => second.itemCount - first.itemCount)
			.slice(0, 5);
	}, [categories, transactions]);

	if (isLoading) {
		return (
			<main className="m-auto max-w-7xl p-12">
				<div className="rounded-xl border border-financy-gray-200 bg-white p-8 text-center text-financy-gray-600 text-sm">
					Carregando dados do dashboard...
				</div>
			</main>
		);
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
