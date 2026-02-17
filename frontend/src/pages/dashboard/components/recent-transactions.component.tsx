import { Plus } from 'lucide-react';
import { CreateTransactionModal } from '@/components/create-transaction-modal';
import { SectionCard } from '@/components/section-card';
import { Button } from '@/components/ui/button';
import type { RecentTransactionItem } from '@/types/view/dashboard';
import { TransactionRow } from './transaction-row.component';

interface RecentTransactionsProps {
	transactions: RecentTransactionItem[];
}

export const RecentTransactions = ({
	transactions,
}: RecentTransactionsProps) => {
	return (
		<SectionCard
			title="Transações recentes"
			linkTo="/transactions"
			linkLabel="Ver todas"
			className="flex-2"
			footer={
				<CreateTransactionModal>
					<Button
						variant="ghost"
						className="cursor-pointer text-financy-brand-base hover:bg-transparent hover:text-financy-brand-dark"
					>
						<Plus className="h-5 w-5" />
						Nova transação
					</Button>
				</CreateTransactionModal>
			}
		>
			{transactions.length > 0 ? (
				transactions.map((transaction) => (
					<TransactionRow
						key={transaction.id}
						description={transaction.description}
						date={transaction.date}
						category={transaction.category}
						amount={transaction.amount}
						type={transaction.type}
					/>
				))
			) : (
				<p className="px-6 py-5 text-financy-gray-600 text-sm">
					Nenhuma transação cadastrada.
				</p>
			)}
		</SectionCard>
	);
};
