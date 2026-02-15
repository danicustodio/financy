import type { IResolvers } from 'mercurius';

export const resolvers: IResolvers = {
	Query: {
		users: async (_root, _args, ctx) => {
			return ctx.app.prisma.user.findMany();
		},

		user: async (_root, args: { id: number }, ctx) => {
			return ctx.app.prisma.user.findUnique({
				where: { id: args.id },
			});
		},
	},

	Mutation: {
		createUser: async (_root, args: { name: string; email: string }, ctx) => {
			return ctx.app.prisma.user.create({
				data: {
					name: args.name,
					email: args.email,
				},
			});
		},

		updateUser: async (
			_root,
			args: { id: number; name?: string; email?: string },
			ctx,
		) => {
			return ctx.app.prisma.user.update({
				where: { id: args.id },
				data: {
					...(args.name !== undefined && { name: args.name }),
					...(args.email !== undefined && { email: args.email }),
				},
			});
		},

		deleteUser: async (_root, args: { id: number }, ctx) => {
			return ctx.app.prisma.user.delete({
				where: { id: args.id },
			});
		},
	},
};
