import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react';
import { useMemo } from 'react';
import { useListCategories } from '@/features/categories/list-categories';
import { useDashboardSummary } from '@/features/dashboard/dashboard-summary';
import {
	formatAmountFromCents,
	formatDate,
	toCategoryColor,
} from '@/features/listings/listing-presenter';
import { useListTransactions } from '@/features/transactions/list-transactions';
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
				amount: formatAmountFromCents(transaction.amountCents),
				type: transaction.type,
			})),
		[transactions],
	);

	const categoriesSectionData = useMemo(() => {
		const totalsByCategoryId = transactions.reduce<
			Record<string, { amountCents: number; itemCount: number }>
		>((acc, transaction) => {
			const categoryId = transaction.category.id;
			const current = acc[categoryId] ?? { amountCents: 0, itemCount: 0 };
			acc[categoryId] = {
				amountCents: current.amountCents + transaction.amountCents,
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
				amount: formatAmountFromCents(
					totalsByCategoryId[category.id]?.amountCents ?? 0,
				),
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
					value={formatAmountFromCents(summary?.totalBalanceCents ?? 0)}
					accentClassName="text-financy-purple-base"
				/>
				<SummaryCard
					icon={CircleArrowUp}
					label="Receitas do mês"
					value={formatAmountFromCents(summary?.monthlyIncomeCents ?? 0)}
					accentClassName="text-financy-brand-base"
				/>
				<SummaryCard
					icon={CircleArrowDown}
					label="Despesas do mês"
					value={formatAmountFromCents(summary?.monthlyExpenseCents ?? 0)}
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
