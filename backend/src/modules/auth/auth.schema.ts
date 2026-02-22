import { builder } from '../../graphql/builder';
import { UserRef } from '../users/users.schema';
import {
	loginInputSchema,
	requestPasswordResetInputSchema,
	resetPasswordInputSchema,
	signUpInputSchema,
} from './auth.validation';

export const SignUpInputRef = builder.inputType('SignUpInput', {
	fields: (t) => ({
		name: t.string({ required: true, validate: signUpInputSchema.shape.name }),
		email: t.string({
			required: true,
			validate: signUpInputSchema.shape.email,
		}),
		password: t.string({
			required: true,
			validate: signUpInputSchema.shape.password,
		}),
	}),
});

export const LoginInputRef = builder.inputType('LoginInput', {
	fields: (t) => ({
		email: t.string({ required: true, validate: loginInputSchema.shape.email }),
		password: t.string({ required: true }),
	}),
});

export const RequestPasswordResetInputRef = builder.inputType(
	'RequestPasswordResetInput',
	{
		fields: (t) => ({
			email: t.string({
				required: true,
				validate: requestPasswordResetInputSchema.shape.email,
			}),
		}),
	},
);

export const ResetPasswordInputRef = builder.inputType('ResetPasswordInput', {
	fields: (t) => ({
		token: t.string({
			required: true,
			validate: resetPasswordInputSchema.shape.token,
		}),
		password: t.string({
			required: true,
			validate: resetPasswordInputSchema.shape.password,
		}),
	}),
});

export type AuthPayloadParent = {
	token: string;
	user: {
		id: string;
		name: string;
		email: string;
		passwordHash: string;
		createdAt: Date;
		updatedAt: Date;
	};
};

export const AuthPayloadRef = builder.objectType(
	builder.objectRef<AuthPayloadParent>('AuthPayload'),
	{
		fields: (t) => ({
			token: t.exposeString('token'),
			user: t.field({
				type: UserRef,
				resolve: (parent) => parent.user,
			}),
		}),
	},
);
