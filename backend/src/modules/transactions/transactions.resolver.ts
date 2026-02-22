import { builder } from '../../graphql/builder';
import { mapResolverError } from '../../shared/errors/graphql-error-mapper';
import {
	CreateTransactionInputRef,
	TransactionFilterRef,
	TransactionPageRef,
	TransactionPaginationRef,
	TransactionRef,
	UpdateTransactionInputRef,
} from './transactions.schema';
import {
	createTransactionInputSchema,
	transactionFilterSchema,
	transactionIdSchema,
	transactionPaginationSchema,
	updateTransactionInputSchema,
} from './transactions.validation';

builder.queryFields((t) => ({
	transactions: t.field({
		type: TransactionPageRef,
		args: {
			filter: t.arg({ type: TransactionFilterRef, required: false }),
			pagination: t.arg({ type: TransactionPaginationRef, required: false }),
		},
		resolve: async (_root, args, ctx) =>
			mapResolverError(async () =>
				ctx.services.transactions.list(
					ctx.currentUser,
					args.filter != null
						? transactionFilterSchema.parse(args.filter)
						: null,
					args.pagination != null
						? transactionPaginationSchema.parse(args.pagination)
						: null,
				),
			),
	}),
}));

builder.mutationFields((t) => ({
	deleteTransaction: t.field({
		type: 'Boolean',
		args: {
			id: t.arg.id({ required: true }),
		},
		resolve: async (_root, args, ctx) =>
			mapResolverError(async () =>
				ctx.services.transactions.delete(
					ctx.currentUser,
					transactionIdSchema.parse(args.id),
				),
			),
	}),
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
	updateTransaction: t.field({
		type: TransactionRef,
		args: {
			input: t.arg({ type: UpdateTransactionInputRef, required: true }),
		},
		resolve: async (_root, args, ctx) =>
			mapResolverError(async () =>
				ctx.services.transactions.update(
					ctx.currentUser,
					updateTransactionInputSchema.parse(args.input),
				),
			),
	}),
}));
