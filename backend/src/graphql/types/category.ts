import { z } from 'zod/v4';
import { builder } from '../builder';
import { unauthenticatedError } from '../errors';

builder.prismaObject('Category', {
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		icon: t.exposeString('icon'),
		description: t.exposeString('description', { nullable: true }),
		color: t.exposeString('color'),
		createdAt: t.expose('createdAt', { type: 'DateTime' }),
	}),
});

const CreateCategoryInput = builder.inputType('CreateCategoryInput', {
	fields: (t) => ({
		name: t.string({
			required: true,
			validate: z.string().min(1, 'Nome é obrigatório'),
		}),
		icon: t.string({
			required: true,
			validate: z.enum([
				'utensils',
				'car-front',
				'briefcase-business',
				'ticket',
				'piggy-bank',
				'shopping-cart',
				'heart-pulse',
				'tag',
				'tool-case',
				'paw-print',
				'house',
				'gift',
				'dumbbell',
				'book-open',
				'receipt-text',
				'mailbox',
			]),
		}),
		description: t.string({
			required: false,
		}),
		color: t.string({
			required: true,
			validate: z.enum([
				'blue',
				'green',
				'red',
				'yellow',
				'purple',
				'orange',
				'pink',
				'gray',
			]),
		}),
	}),
});

builder.queryFields((t) => ({
	categories: t.prismaField({
		type: ['Category'],
		resolve: async (query, _root, _args, ctx) => {
			if (!ctx.currentUser) throw unauthenticatedError();

			return ctx.prisma.category.findMany({
				...query,
				where: { userId: ctx.currentUser.id },
				orderBy: { name: 'asc' },
			});
		},
	}),
}));

builder.mutationFields((t) => ({
	createCategory: t.prismaField({
		type: 'Category',
		args: {
			input: t.arg({ type: CreateCategoryInput, required: true }),
		},
		resolve: async (query, _root, args, ctx) => {
			if (!ctx.currentUser) throw unauthenticatedError();

			return ctx.prisma.category.create({
				...query,
				data: {
					name: args.input.name,
					icon: args.input.icon,
					description: args.input.description,
					color: args.input.color,
					userId: ctx.currentUser.id,
				},
			});
		},
	}),
}));
