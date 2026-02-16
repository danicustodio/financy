import bcrypt from 'bcryptjs';
import { z } from 'zod/v4';
import { builder } from '../builder';

const SignUpInput = builder.inputType('SignUpInput', {
	fields: (t) => ({
		name: t.string({
			required: true,
			validate: z.string().min(2, 'Name must be at least 2 characters'),
		}),
		email: t.string({
			required: true,
			validate: z.email('Invalid email address'),
		}),
		password: t.string({
			required: true,
			validate: z.string().min(8, 'Password must be at least 8 characters'),
		}),
	}),
});

const AuthPayload = builder.objectType(
	builder.objectRef<{ token: string; user: { id: string } }>('AuthPayload'),
	{
		fields: (t) => ({
			token: t.exposeString('token'),
			user: t.prismaField({
				type: 'User',
				resolve: (query, parent, _args, ctx) =>
					ctx.prisma.user.findUniqueOrThrow({ ...query, where: { id: parent.user.id } }),
			}),
		}),
	},
);

const LoginInput = builder.inputType('LoginInput', {
	fields: (t) => ({
		email: t.string({
			required: true,
			validate: z.email('Invalid email address'),
		}),
		password: t.string({
			required: true,
		}),
	}),
});

builder.mutationFields((t) => ({
	login: t.field({
		type: AuthPayload,
		args: {
			input: t.arg({ type: LoginInput, required: true }),
		},
		resolve: async (_root, args, ctx) => {
			const user = await ctx.prisma.user.findUnique({
				where: { email: args.input.email },
			});

			if (!user) {
				throw new Error('E-mail ou senha inválidos');
			}

			const valid = await bcrypt.compare(args.input.password, user.passwordHash);

			if (!valid) {
				throw new Error('E-mail ou senha inválidos');
			}

			const token = ctx.request.server.jwt.sign({ sub: user.id });
			return { token, user };
		},
	}),

	signUp: t.field({
		type: AuthPayload,
		args: {
			input: t.arg({ type: SignUpInput, required: true }),
		},
		resolve: async (_root, args, ctx) => {
			const passwordHash = await bcrypt.hash(args.input.password, 12);
			const user = await ctx.prisma.user.create({
				data: {
					name: args.input.name,
					email: args.input.email,
					passwordHash,
				},
			});
			const token = ctx.request.server.jwt.sign({ sub: user.id });
			return { token, user };
		},
	}),
}));
