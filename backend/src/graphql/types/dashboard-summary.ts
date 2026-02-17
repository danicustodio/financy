import { builder } from '../builder';
import { unauthenticatedError } from '../errors';

const DashboardSummary = builder.simpleObject('DashboardSummary', {
	fields: (t) => ({
		totalBalance: t.int(),
		monthlyIncome: t.int(),
		monthlyExpense: t.int(),
	}),
});

builder.queryFields((t) => ({
	dashboardSummary: t.field({
		type: DashboardSummary,
		args: {
			month: t.arg.int(),
			year: t.arg.int(),
		},
		resolve: async (_root, args, ctx) => {
			if (!ctx.currentUser) throw unauthenticatedError();

			const now = new Date();
			const month = args.month ?? now.getMonth() + 1;
			const year = args.year ?? now.getFullYear();

			const startOfMonth = new Date(year, month - 1, 1);
			const startOfNextMonth = new Date(year, month, 1);

			const userId = ctx.currentUser.id;

			const [totalIncome, totalExpense, monthlyIncome, monthlyExpense] =
				await Promise.all([
					ctx.prisma.transaction.aggregate({
						where: { userId, type: 'income' },
						_sum: { amount: true },
					}),
					ctx.prisma.transaction.aggregate({
						where: { userId, type: 'expense' },
						_sum: { amount: true },
					}),
					ctx.prisma.transaction.aggregate({
						where: {
							userId,
							type: 'income',
							date: { gte: startOfMonth, lt: startOfNextMonth },
						},
						_sum: { amount: true },
					}),
					ctx.prisma.transaction.aggregate({
						where: {
							userId,
							type: 'expense',
							date: { gte: startOfMonth, lt: startOfNextMonth },
						},
						_sum: { amount: true },
					}),
				]);

			return {
				totalBalance:
					(totalIncome._sum.amount ?? 0) - (totalExpense._sum.amount ?? 0),
				monthlyIncome: monthlyIncome._sum.amount ?? 0,
				monthlyExpense: monthlyExpense._sum.amount ?? 0,
			};
		},
	}),
}));
