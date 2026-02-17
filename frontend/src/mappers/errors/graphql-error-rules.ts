import type { ErrorRule } from './graphql-error.mapper';

export const AUTH_SIGN_IN_ERROR_FALLBACK =
	'Ocorreu um erro ao fazer login. Tente novamente.';

export const AUTH_SIGN_IN_ERROR_RULES: ErrorRule[] = [
	{
		code: 'INVALID_CREDENTIALS',
		userMessage: 'E-mail ou senha incorretos.',
	},
];

export const AUTH_SIGN_UP_ERROR_FALLBACK =
	'Ocorreu um erro ao criar sua conta. Tente novamente.';

export const AUTH_SIGN_UP_ERROR_RULES: ErrorRule[] = [
	{
		code: 'CONFLICT',
		userMessage: 'Este e-mail já está em uso.',
	},
];

export const CREATE_CATEGORY_ERROR_FALLBACK =
	'Ocorreu um erro ao criar a categoria. Tente novamente.';

export const CREATE_CATEGORY_ERROR_RULES: ErrorRule[] = [
	{
		code: 'UNAUTHENTICATED',
		userMessage: 'Sua sessão expirou. Faça login novamente.',
	},
	{
		code: 'CONFLICT',
		userMessage: 'Já existe uma categoria com este nome.',
	},
];

export const CREATE_TRANSACTION_ERROR_FALLBACK =
	'Ocorreu um erro ao criar a transação. Tente novamente.';

export const CREATE_TRANSACTION_ERROR_RULES: ErrorRule[] = [
	{
		code: 'UNAUTHENTICATED',
		userMessage: 'Sua sessão expirou. Faça login novamente.',
	},
	{
		code: 'NOT_FOUND',
		userMessage: 'Categoria selecionada não foi encontrada.',
	},
];
