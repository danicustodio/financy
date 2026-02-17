import { builder } from '../../graphql/builder';

export const DashboardSummaryRef = builder.simpleObject('DashboardSummary', {
	fields: (t) => ({
		totalBalance: t.int(),
		monthlyIncome: t.int(),
		monthlyExpense: t.int(),
	}),
});
