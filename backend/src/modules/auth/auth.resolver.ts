import { builder } from '../../graphql/builder';
import { mapResolverError } from '../../shared/errors/graphql-error-mapper';
import { AuthPayloadRef, LoginInputRef, SignUpInputRef } from './auth.schema';

builder.mutationFields((t) => ({
	login: t.field({
		type: AuthPayloadRef,
		args: {
			input: t.arg({ type: LoginInputRef, required: true }),
		},
		resolve: async (_root, args, ctx) =>
			mapResolverError(async () => ctx.services.auth.login(args.input)),
	}),

	signUp: t.field({
		type: AuthPayloadRef,
		args: {
			input: t.arg({ type: SignUpInputRef, required: true }),
		},
		resolve: async (_root, args, ctx) =>
			mapResolverError(async () => ctx.services.auth.signUp(args.input)),
	}),
}));
