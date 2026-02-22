import { builder } from '../../graphql/builder';
import { mapResolverError } from '../../shared/errors/graphql-error-mapper';
import { UpdateMeInputRef, UserRef } from './users.schema';

builder.queryFields((t) => ({
	me: t.field({
		type: UserRef,
		resolve: async (_root, _args, ctx) =>
			mapResolverError(async () => ctx.services.users.me(ctx.currentUser)),
	}),
}));

builder.mutationFields((t) => ({
	updateMe: t.field({
		type: UserRef,
		args: {
			input: t.arg({ type: UpdateMeInputRef, required: true }),
		},
		resolve: async (_root, args, ctx) =>
			mapResolverError(async () =>
				ctx.services.users.updateMe(ctx.currentUser, {
					...(args.input.name != null && { name: args.input.name }),
					...(args.input.email != null && { email: args.input.email }),
				}),
			),
	}),
}));
