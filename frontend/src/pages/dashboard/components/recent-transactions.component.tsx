import { ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CreateTransactionModal } from '@/components/create-transaction-modal';
import type { TagVariants } from '@/components/tag';
import { TransactionRow } from './transaction-row.component';

interface RecentTransactionItem {
	id: string;
	description: string;
	date: string;
	category: string;
	categoryColor: NonNullable<TagVariants['color']>;
	amount: string;
	type: 'income' | 'expense';
}

interface RecentTransactionsProps {
	transactions: RecentTransactionItem[];
}

export const RecentTransactions = ({
	transactions,
}: RecentTransactionsProps) => {
	return (
		<div className="flex-2 overflow-hidden rounded-xl border border-financy-gray-200 bg-white">
			<div className="flex items-center justify-between border-financy-gray-200 border-b px-6 py-5">
				<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
					Transações recentes
				</span>
				<Link
					to="/transactions"
					className="flex items-center gap-1 text-financy-brand-base text-sm"
				>
					Ver todas
					<ChevronRight className="h-5 w-5" />
				</Link>
			</div>

			<div>
				{transactions.length > 0 ? (
					transactions.map((transaction) => (
						<TransactionRow
							key={transaction.id}
							description={transaction.description}
							date={transaction.date}
							category={transaction.category}
							categoryColor={transaction.categoryColor}
							amount={transaction.amount}
							type={transaction.type}
						/>
					))
				) : (
					<p className="px-6 py-5 text-financy-gray-600 text-sm">
						Nenhuma transação cadastrada.
					</p>
				)}
			</div>

			<div className="flex items-center justify-center px-6 py-5">
				<CreateTransactionModal>
					<button
						type="button"
						className="flex cursor-pointer items-center gap-1 text-financy-brand-base"
					>
						<Plus className="h-5 w-5" />
						Nova transação
					</button>
				</CreateTransactionModal>
			</div>
		</div>
	);
};
