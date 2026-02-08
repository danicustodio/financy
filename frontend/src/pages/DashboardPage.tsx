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
import { Navbar } from '@/components/navbar';

// Sample data for recent transactions
const recentTransactions = [
	{
		id: 1,
		description: 'Pagamento de Salário',
		date: '01/12/25',
		category: 'Receita',
		categoryColor: 'green' as const,
		amount: 'R$ 4.250,00',
		type: 'income' as const,
		iconBgColor: '#E0FAE9', // green-light
	},
	{
		id: 2,
		description: 'Jantar no Restaurante',
		date: '30/11/25',
		category: 'Alimentação',
		categoryColor: 'blue' as const,
		amount: 'R$ 89,50',
		type: 'expense' as const,
		iconBgColor: '#DBEAFE', // blue-light
	},
	{
		id: 3,
		description: 'Posto de Gasolina',
		date: '29/11/25',
		category: 'Transporte',
		categoryColor: 'purple' as const,
		amount: 'R$ 100,00',
		type: 'expense' as const,
		iconBgColor: '#F3E8FF', // purple-light
	},
	{
		id: 4,
		description: 'Compras no Mercado',
		date: '28/11/25',
		category: 'Mercado',
		categoryColor: 'orange' as const,
		amount: 'R$ 156,80',
		type: 'expense' as const,
		iconBgColor: '#FFEDD5', // orange-light
	},
	{
		id: 5,
		description: 'Retorno de Investimento',
		date: '26/11/25',
		category: 'Investimento',
		categoryColor: 'green' as const,
		amount: 'R$ 340,25',
		type: 'income' as const,
		iconBgColor: '#E0FAE9', // green-light
	},
];

// Sample data for categories
const categories = [
	{
		id: 1,
		category: 'Alimentação',
		categoryColor: 'blue' as const,
		itemCount: 12,
		amount: 'R$ 542,30',
	},
	{
		id: 2,
		category: 'Transporte',
		categoryColor: 'purple' as const,
		itemCount: 8,
		amount: 'R$ 385,50',
	},
	{
		id: 3,
		category: 'Mercado',
		categoryColor: 'orange' as const,
		itemCount: 3,
		amount: 'R$ 298,75',
	},
	{
		id: 4,
		category: 'Entretenimento',
		categoryColor: 'pink' as const,
		itemCount: 2,
		amount: 'R$ 186,20',
	},
	{
		id: 5,
		category: 'Utilidades',
		categoryColor: 'yellow' as const,
		itemCount: 7,
		amount: 'R$ 245,80',
	},
];

export function DashboardPage() {
	return (
		<div className="min-h-screen bg-financy-gray-100">
			<Navbar />

			<main className="p-12">
				{/* Summary Cards Row */}
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
							{recentTransactions.map((transaction) => (
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
							<Link
								href="/transactions/new"
								className="flex items-center gap-1"
							>
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
							{categories.map((cat) => (
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
		</div>
	);
}
