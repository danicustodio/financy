import { ChevronRight, Plus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CreateTransactionModal } from '@/components/create-transaction-modal';
import type { BadgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { TransactionRow } from './transaction-row.component';

interface RecentTransactionItem {
	id: string;
	description: string;
	date: string;
	category: {
		name: string;
		icon: LucideIcon;
		color: NonNullable<BadgeVariants['color']>;
	};
	amount: number;
	type: 'income' | 'expense';
}

interface RecentTransactionsProps {
	transactions: RecentTransactionItem[];
}

export const RecentTransactions = ({
	transactions,
}: RecentTransactionsProps) => {
	return (
		<Card className="flex-2 gap-0 overflow-hidden border-financy-gray-200 bg-white p-0 shadow-none">
			<CardHeader className="border-financy-gray-200 border-b px-6 py-5">
				<CardTitle className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
					Transações recentes
				</CardTitle>
				<CardAction>
					<Link
						to="/transactions"
						className="flex items-center gap-1 text-financy-brand-base text-sm"
					>
						Ver todas
						<ChevronRight className="h-5 w-5" />
					</Link>
				</CardAction>
			</CardHeader>

			<CardContent className="p-0">
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
			</CardContent>

			<CardFooter className="justify-center px-6 py-5">
				<CreateTransactionModal>
					<Button
						variant="ghost"
						className="cursor-pointer text-financy-brand-base hover:bg-transparent hover:text-financy-brand-dark"
					>
						<Plus className="h-5 w-5" />
						Nova transação
					</Button>
				</CreateTransactionModal>
			</CardFooter>
		</Card>
	);
};
