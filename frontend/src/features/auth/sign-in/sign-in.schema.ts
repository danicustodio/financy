import type { RegisterOptions } from 'react-hook-form';
import type { SignInFormData } from './sign-in.types';

const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const signInFormRules: {
	[K in keyof SignInFormData]: RegisterOptions<SignInFormData, K>;
} = {
	email: {
		required: 'E-mail é obrigatório',
		pattern: {
			value: emailPattern,
			message: 'E-mail inválido',
		},
	},
	password: {
		required: 'Senha é obrigatória',
		minLength: {
			value: 6,
			message: 'Senha deve ter no mínimo 6 caracteres',
		},
	},
};
