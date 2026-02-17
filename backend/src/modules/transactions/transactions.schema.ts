import { builder } from '../../graphql/builder';
import {
	createTransactionInputSchema,
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
