import {
	ChevronRight,
	CircleArrowDown,
	CircleArrowUp,
	Plus,
	Wallet,
} from 'lucide-react';
import {
	CategoryRow,
	SummaryCard,
	TransactionRow,
} from '@/components/dashboard';
import { Link } from '@/components/link';
import { MOCK_CATEGORIES, MOCK_TRANSACTIONS } from './transation.mock';

export function Dashboard() {
	return (
		<main className="p-12">
			<div className="flex gap-6 mb-6">
				<SummaryCard icon={Wallet} label="Saldo total" value="R$ 12.847,32" />
				<SummaryCard
					icon={CircleArrowUp}
					label="Receitas do mês"
					value="R$ 4.250,00"
				/>
				<SummaryCard
					icon={CircleArrowDown}
					label="Despesas do mês"
					value="R$ 2.180,45"
				/>
			</div>

			{/* Main Content - Two Columns */}
			<div className="flex gap-6">
				{/* Recent Transactions Section */}
				<div className="flex-2 bg-white border border-financy-gray-200 rounded-xl overflow-hidden">
					{/* Header */}
					<div className="flex items-center justify-between px-6 py-5 border-b border-financy-gray-200">
						<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
							Transações recentes
						</span>
						<Link href="/transactions" className="flex items-center gap-1">
							Ver todas
							<ChevronRight className="w-5 h-5" />
						</Link>
					</div>

					{/* Transaction List */}
					<div>
						{MOCK_TRANSACTIONS.map((transaction) => (
							<TransactionRow
								key={transaction.id}
								description={transaction.description}
								date={transaction.date}
								category={transaction.category}
								categoryColor={transaction.categoryColor}
								amount={transaction.amount}
								type={transaction.type}
								iconBgColor={transaction.iconBgColor}
							/>
						))}
					</div>

					{/* Footer - New Transaction Link */}
					<div className="flex items-center justify-center px-6 py-5">
						<Link href="/transactions/new" className="flex items-center gap-1">
							<Plus className="w-5 h-5" />
							Nova transação
						</Link>
					</div>
				</div>

				{/* Categories Section */}
				<div className="flex-1 bg-white border border-financy-gray-200 rounded-xl overflow-hidden">
					{/* Header */}
					<div className="flex items-center justify-between px-6 py-5 border-b border-financy-gray-200">
						<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
							Categorias
						</span>
						<Link href="/categories" className="flex items-center gap-1">
							Gerenciar
							<ChevronRight className="w-5 h-5" />
						</Link>
					</div>

					{/* Category List */}
					<div className="flex flex-col gap-5 p-6">
						{MOCK_CATEGORIES.map((cat) => (
							<CategoryRow
								key={cat.id}
								category={cat.category}
								categoryColor={cat.categoryColor}
								itemCount={cat.itemCount}
								amount={cat.amount}
							/>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
