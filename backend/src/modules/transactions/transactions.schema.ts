import { builder } from '../../graphql/builder';
import {
	createTransactionInputSchema,
	updateTransactionInputSchema,
	transactionTypeSchema,
} from './transactions.validation';

export const TransactionRef = builder.prismaObject('Transaction', {
	fields: (t) => ({
		id: t.exposeID('id'),
		description: t.exposeString('description'),
		amount: t.exposeInt('amount'),
		type: t.exposeString('type'),
		date: t.expose('date', { type: 'DateTime' }),
		category: t.relation('category'),
		createdAt: t.expose('createdAt', { type: 'DateTime' }),
	}),
});

export const TransactionPageRef = builder.simpleObject('TransactionPage', {
	fields: (t) => ({
		items: t.field({ type: [TransactionRef] }),
		totalCount: t.int(),
	}),
});

export const TransactionFilterRef = builder.inputType('TransactionFilter', {
	fields: (t) => ({
		search: t.string({ required: false }),
		type: t.string({ required: false }),
		categoryId: t.id({ required: false }),
		month: t.int({ required: false }),
		year: t.int({ required: false }),
	}),
});

export const TransactionPaginationRef = builder.inputType(
	'TransactionPagination',
	{
		fields: (t) => ({
			page: t.int({ required: true }),
			pageSize: t.int({ required: true }),
		}),
	},
);

export const CreateTransactionInputRef = builder.inputType(
	'CreateTransactionInput',
	{
		fields: (t) => ({
			description: t.string({
				required: true,
				validate: createTransactionInputSchema.shape.description,
			}),
			amount: t.int({
				required: true,
				validate: createTransactionInputSchema.shape.amount,
			}),
			type: t.string({ required: true, validate: transactionTypeSchema }),
			date: t.field({ type: 'DateTime', required: true }),
			categoryId: t.string({
				required: true,
				validate: createTransactionInputSchema.shape.categoryId,
			}),
		}),
	},
);

export const UpdateTransactionInputRef = builder.inputType(
	'UpdateTransactionInput',
	{
		fields: (t) => ({
			id: t.id({
				required: true,
				validate: updateTransactionInputSchema.shape.id,
			}),
			description: t.string({
				required: true,
				validate: updateTransactionInputSchema.shape.description,
			}),
			amount: t.int({
				required: true,
				validate: updateTransactionInputSchema.shape.amount,
			}),
			type: t.string({ required: true, validate: transactionTypeSchema }),
			date: t.field({ type: 'DateTime', required: true }),
			categoryId: t.string({
				required: true,
				validate: updateTransactionInputSchema.shape.categoryId,
			}),
		}),
	},
);
