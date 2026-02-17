import { builder } from '../../graphql/builder';
import { mapResolverError } from '../../shared/errors/graphql-error-mapper';
import { DashboardSummaryRef } from './dashboard.schema';

builder.queryFields((t) => ({
	dashboardSummary: t.field({
		type: DashboardSummaryRef,
		args: {
			month: t.arg.int(),
			year: t.arg.int(),
		},
		resolve: async (_root, args, ctx) =>
			mapResolverError(async () =>
				ctx.services.dashboard.summary(ctx.currentUser, args.month, args.year),
			),
	}),
}));
