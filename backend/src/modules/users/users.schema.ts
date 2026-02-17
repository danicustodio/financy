import { builder } from '../../graphql/builder';
import { updateMeInputSchema } from './users.validation';

builder.scalarType('DateTime', {
	serialize: (value) => {
		if (value instanceof Date) return value.toISOString();
		return new Date(value as string).toISOString();
	},
	parseValue: (value) => new Date(value as string),
});

export const UserRef = builder.prismaObject('User', {
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		email: t.exposeString('email'),
		createdAt: t.expose('createdAt', { type: 'DateTime' }),
		updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
	}),
});

export const UpdateMeInputRef = builder.inputType('UpdateMeInput', {
	fields: (t) => ({
		name: t.string({ validate: updateMeInputSchema.shape.name }),
		email: t.string({ validate: updateMeInputSchema.shape.email }),
	}),
});
