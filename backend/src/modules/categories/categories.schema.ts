import { builder } from '../../graphql/builder';
import {
	categoryColorSchema,
	categoryIconSchema,
	createCategoryInputSchema,
} from './categories.validation';

export const CategoryRef = builder.prismaObject('Category', {
	fields: (t) => ({
		id: t.exposeID('id'),
		title: t.exposeString('title'),
		icon: t.exposeString('icon'),
		description: t.exposeString('description', { nullable: true }),
		color: t.exposeString('color'),
		createdAt: t.expose('createdAt', { type: 'DateTime' }),
	}),
});

export const CreateCategoryInputRef = builder.inputType('CreateCategoryInput', {
	fields: (t) => ({
		title: t.string({
			required: true,
			validate: createCategoryInputSchema.shape.title,
		}),
		icon: t.string({ required: true, validate: categoryIconSchema }),
		description: t.string({ required: false }),
		color: t.string({ required: true, validate: categoryColorSchema }),
	}),
});
