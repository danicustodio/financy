import { z } from 'zod/v4';
import { builder } from '../builder';
import { unauthenticatedError } from '../errors';

builder.prismaObject('Transaction', {
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

const CreateTransactionInput = builder.inputType('CreateTransactionInput', {
	fields: (t) => ({
		description: t.string({
			required: true,
			validate: z.string().min(1, 'Descrição é obrigatória'),
		}),
		amount: t.int({
			required: true,
			validate: z.int().positive('Valor deve ser positivo'),
		}),
		type: t.string({
			required: true,
			validate: z.enum(['income', 'expense']),
		}),
		date: t.field({ type: 'DateTime', required: true }),
		categoryId: t.string({
			required: true,
			validate: z.string().min(1, 'Categoria é obrigatória'),
		}),
	}),
});

builder.queryFields((t) => ({
	transactions: t.prismaField({
		type: ['Transaction'],
		resolve: async (query, _root, _args, ctx) => {
			if (!ctx.currentUser) throw unauthenticatedError();

			return ctx.prisma.transaction.findMany({
				...query,
				where: { userId: ctx.currentUser.id },
				orderBy: { date: 'desc' },
			});
		},
	}),
}));

builder.mutationFields((t) => ({
	createTransaction: t.prismaField({
		type: 'Transaction',
		args: {
			input: t.arg({ type: CreateTransactionInput, required: true }),
		},
		resolve: async (query, _root, args, ctx) => {
			if (!ctx.currentUser) throw unauthenticatedError();

			const category = await ctx.prisma.category.findFirst({
				where: {
					id: args.input.categoryId,
					userId: ctx.currentUser.id,
				},
			});

			if (!category) {
				throw new Error('Categoria não encontrada');
			}

			return ctx.prisma.transaction.create({
				...query,
				data: {
					description: args.input.description,
					amount: args.input.amount,
					type: args.input.type,
					date: args.input.date,
					categoryId: args.input.categoryId,
					userId: ctx.currentUser.id,
				},
			});
		},
	}),
}));
