import { builder } from '../../graphql/builder';
import { mapResolverError } from '../../shared/errors/graphql-error-mapper';
import {
	CategoriesSummaryRef,
	CategoryRef,
	CreateCategoryInputRef,
	UpdateCategoryInputRef,
} from './categories.schema';
import {
	categoryIdSchema,
	createCategoryInputSchema,
	updateCategoryInputSchema,
} from './categories.validation';

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
	updateCategory: t.field({
		type: CategoryRef,
		args: {
			input: t.arg({ type: UpdateCategoryInputRef, required: true }),
		},
		resolve: async (_root, args, ctx) =>
			mapResolverError(async () =>
				ctx.services.categories.update(
					ctx.currentUser,
					updateCategoryInputSchema.parse(args.input),
				),
			),
	}),
	deleteCategory: t.field({
		type: 'Boolean',
		args: {
			id: t.arg.id({ required: true }),
		},
		resolve: async (_root, args, ctx) =>
			mapResolverError(async () =>
				ctx.services.categories.delete(
					ctx.currentUser,
					categoryIdSchema.parse(args.id),
				),
			),
	}),
}));
