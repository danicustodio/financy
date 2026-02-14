import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react';
import { CategoriesSection } from './components/categories-section.component';
import { RecentTransactions } from './components/recent-transactions.component';
import { SummaryCard } from './components/summary-card.component';

export function Dashboard() {
	return (
		<main className="m-auto max-w-7xl p-12">
			<div className="mb-6 flex gap-6">
				<SummaryCard
					icon={Wallet}
					label="Saldo total"
					value="R$ 12.847,32"
					accentClassName="text-financy-purple-base"
				/>
				<SummaryCard
					icon={CircleArrowUp}
					label="Receitas do mês"
					value="R$ 4.250,00"
					accentClassName="text-financy-brand-base"
				/>
				<SummaryCard
					icon={CircleArrowDown}
					label="Despesas do mês"
					value="R$ 2.180,45"
					accentClassName="text-financy-red-base"
				/>
			</div>

			<div className="flex gap-6">
				<RecentTransactions />

				<CategoriesSection />
			</div>
		</main>
	);
}
