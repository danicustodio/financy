import type { User } from '@prisma/client';
import { requireAuth } from '../../shared/auth/require-auth';
import { AppError } from '../../shared/errors/app-error';
import { errorCodes } from '../../shared/errors/error-codes';
import type { TransactionsRepository } from '../transactions/transactions.repository';

export class DashboardService {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
	) {}

	async summary(
		currentUser: User | null,
		month?: number | null,
		year?: number | null,
	) {
		const user = requireAuth(currentUser);
		const now = new Date();
		const selectedMonth = month ?? now.getMonth() + 1;
		const selectedYear = year ?? now.getFullYear();

		if (selectedMonth < 1 || selectedMonth > 12) {
			throw new AppError(
				errorCodes.VALIDATION,
				'Month must be between 1 and 12',
			);
		}

		if (selectedYear < 1970 || selectedYear > 9999) {
			throw new AppError(errorCodes.VALIDATION, 'Year is out of range');
		}

		const startOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
		const startOfNextMonth = new Date(selectedYear, selectedMonth, 1);

		const [totalIncome, totalExpense, monthlyIncome, monthlyExpense] =
			await Promise.all([
				this.transactionsRepository.aggregateAmount(user.id, 'income'),
				this.transactionsRepository.aggregateAmount(user.id, 'expense'),
				this.transactionsRepository.aggregateAmount(user.id, 'income', {
					gte: startOfMonth,
					lt: startOfNextMonth,
				}),
				this.transactionsRepository.aggregateAmount(user.id, 'expense', {
					gte: startOfMonth,
					lt: startOfNextMonth,
				}),
			]);

		return {
			totalBalance:
				(totalIncome._sum.amount ?? 0) - (totalExpense._sum.amount ?? 0),
			monthlyIncome: monthlyIncome._sum.amount ?? 0,
			monthlyExpense: monthlyExpense._sum.amount ?? 0,
		};
	}
}
