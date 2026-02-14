import { ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_TRANSACTIONS } from '../transation.mock';
import { TransactionRow } from './transaction-row.component';

export const RecentTransactions = () => {
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
				{MOCK_TRANSACTIONS.map((transaction) => (
					<TransactionRow
						key={transaction.id}
						description={transaction.description}
						date={transaction.date}
					/>
				))}
			</div>

			<div className="flex items-center justify-center px-6 py-5">
				<Link
					to="/transactions/new"
					className="flex items-center gap-1 text-financy-brand-base"
				>
					<Plus className="h-5 w-5" />
					Nova transação
				</Link>
			</div>
		</div>
	);
};
