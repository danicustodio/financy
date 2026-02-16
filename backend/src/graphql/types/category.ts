import { z } from 'zod/v4';
import { builder } from '../builder';

builder.prismaObject('Category', {
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
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
			if (!ctx.currentUser) throw new Error('Não autenticado');

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
			if (!ctx.currentUser) throw new Error('Não autenticado');

			return ctx.prisma.category.create({
				...query,
				data: {
					name: args.input.name,
					color: args.input.color,
					userId: ctx.currentUser.id,
				},
			});
		},
	}),
}));
