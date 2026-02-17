import { builder } from '../../graphql/builder';
import { mapResolverError } from '../../shared/errors/graphql-error-mapper';
import {
	CategoriesSummaryRef,
	CategoryRef,
	CreateCategoryInputRef,
} from './categories.schema';
import { createCategoryInputSchema } from './categories.validation';

builder.queryFields((t) => ({
	categories: t.field({
		type: [CategoryRef],
		resolve: async (_root, _args, ctx) =>
			mapResolverError(async () =>
				ctx.services.categories.list(ctx.currentUser),
			),
	}),
	categoriesSummary: t.field({
		type: CategoriesSummaryRef,
		resolve: async (_root, _args, ctx) =>
			mapResolverError(async () =>
				ctx.services.categories.summary(ctx.currentUser),
			),
	}),
}));

builder.mutationFields((t) => ({
	createCategory: t.field({
		type: CategoryRef,
		args: {
			input: t.arg({ type: CreateCategoryInputRef, required: true }),
		},
		resolve: async (_root, args, ctx) =>
			mapResolverError(async () =>
				ctx.services.categories.create(
					ctx.currentUser,
					createCategoryInputSchema.parse(args.input),
				),
			),
	}),
}));
