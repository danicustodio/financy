import { z } from 'zod/v4';
import { builder } from '../builder.js';

// --- User Object Type (auto from Prisma) ---
builder.prismaObject('User', {
	fields: (t) => ({
		id: t.exposeInt('id'),
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
const CreateUserInput = builder.inputType('CreateUserInput', {
	fields: (t) => ({
		name: t.string({
			required: true,
			validate: z.string().min(2, 'Name must be at least 2 characters'),
		}),
		email: t.string({
			required: true,
			validate: z.string().email('Invalid email address'),
		}),
	}),
});

const UpdateUserInput = builder.inputType('UpdateUserInput', {
	fields: (t) => ({
		name: t.string({
			validate: z.string().min(2, 'Name must be at least 2 characters'),
		}),
		email: t.string({
			validate: z.string().email('Invalid email address'),
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
			id: t.arg.int({ required: true }),
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
	createUser: t.prismaField({
		type: 'User',
		args: {
			input: t.arg({ type: CreateUserInput, required: true }),
		},
		resolve: async (query, _root, args, ctx) => {
			return ctx.prisma.user.create({
				...query,
				data: {
					name: args.input.name,
					email: args.input.email,
				},
			});
		},
	}),

	updateUser: t.prismaField({
		type: 'User',
		nullable: true,
		args: {
			id: t.arg.int({ required: true }),
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
			id: t.arg.int({ required: true }),
		},
		resolve: async (query, _root, args, ctx) => {
			return ctx.prisma.user.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));
