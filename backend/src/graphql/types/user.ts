import { z } from 'zod/v4';
import { builder } from '../builder.js';

// --- User Object Type (auto from Prisma) ---
builder.prismaObject('User', {
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		email: t.exposeString('email'),
		createdAt: t.expose('createdAt', { type: 'DateTime' }),
		updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
	}),
});

// --- DateTime scalar ---
builder.scalarType('DateTime', {
	serialize: (value) => {
		if (value instanceof Date) return value.toISOString();
		return new Date(value as string).toISOString();
	},
	parseValue: (value) => new Date(value as string),
});

// --- Input Types ---
const UpdateUserInput = builder.inputType('UpdateUserInput', {
	fields: (t) => ({
		name: t.string({
			validate: z.string().min(2, 'Name must be at least 2 characters'),
		}),
		email: t.string({
			validate: z.email('Invalid email address'),
		}),
	}),
});

// --- Queries ---
builder.queryFields((t) => ({
	users: t.prismaField({
		type: ['User'],
		resolve: async (query, _root, _args, ctx) => {
			return ctx.prisma.user.findMany({ ...query });
		},
	}),

	user: t.prismaField({
		type: 'User',
		nullable: true,
		args: {
			id: t.arg.id({ required: true }),
		},
		resolve: async (query, _root, args, ctx) => {
			return ctx.prisma.user.findUnique({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));

// --- Mutations ---
builder.mutationFields((t) => ({
	updateUser: t.prismaField({
		type: 'User',
		nullable: true,
		args: {
			id: t.arg.id({ required: true }),
			input: t.arg({ type: UpdateUserInput, required: true }),
		},
		resolve: async (query, _root, args, ctx) => {
			return ctx.prisma.user.update({
				...query,
				where: { id: args.id },
				data: {
					...(args.input.name != null && { name: args.input.name }),
					...(args.input.email != null && { email: args.input.email }),
				},
			});
		},
	}),

	deleteUser: t.prismaField({
		type: 'User',
		nullable: true,
		args: {
			id: t.arg.id({ required: true }),
		},
		resolve: async (query, _root, args, ctx) => {
			return ctx.prisma.user.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));
