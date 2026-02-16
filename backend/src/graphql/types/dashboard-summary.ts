import { builder } from '../builder';
import { unauthenticatedError } from '../errors';

const DashboardSummary = builder.simpleObject('DashboardSummary', {
	fields: (t) => ({
		totalBalanceCents: t.int(),
		monthlyIncomeCents: t.int(),
		monthlyExpenseCents: t.int(),
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
						_sum: { amountCents: true },
					}),
					ctx.prisma.transaction.aggregate({
						where: { userId, type: 'expense' },
						_sum: { amountCents: true },
					}),
					ctx.prisma.transaction.aggregate({
						where: {
							userId,
							type: 'income',
							date: { gte: startOfMonth, lt: startOfNextMonth },
						},
						_sum: { amountCents: true },
					}),
					ctx.prisma.transaction.aggregate({
						where: {
							userId,
							type: 'expense',
							date: { gte: startOfMonth, lt: startOfNextMonth },
						},
						_sum: { amountCents: true },
					}),
				]);

			return {
				totalBalanceCents:
					(totalIncome._sum.amountCents ?? 0) -
					(totalExpense._sum.amountCents ?? 0),
				monthlyIncomeCents: monthlyIncome._sum.amountCents ?? 0,
				monthlyExpenseCents: monthlyExpense._sum.amountCents ?? 0,
			};
		},
	}),
}));
