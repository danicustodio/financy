import { builder } from '../../graphql/builder';
import { mapResolverError } from '../../shared/errors/graphql-error-mapper';
import {
	CreateTransactionInputRef,
	TransactionRef,
} from './transactions.schema';
import { createTransactionInputSchema } from './transactions.validation';

builder.queryFields((t) => ({
	transactions: t.field({
		type: [TransactionRef],
		resolve: async (_root, _args, ctx) =>
			mapResolverError(async () =>
				ctx.services.transactions.list(ctx.currentUser),
			),
	}),
}));

builder.mutationFields((t) => ({
	createTransaction: t.field({
		type: TransactionRef,
		args: {
			input: t.arg({ type: CreateTransactionInputRef, required: true }),
		},
		resolve: async (_root, args, ctx) =>
			mapResolverError(async () =>
				ctx.services.transactions.create(
					ctx.currentUser,
					createTransactionInputSchema.parse(args.input),
				),
			),
	}),
}));
