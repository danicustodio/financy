import type { RegisterOptions } from 'react-hook-form';
import type { SignUpFormData } from './sign-up.types';

const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const signUpFormRules: {
	[K in keyof SignUpFormData]: RegisterOptions<SignUpFormData, K>;
} = {
	name: {
		required: 'Nome é obrigatório',
		minLength: {
			value: 2,
			message: 'Nome deve ter no mínimo 2 caracteres',
		},
	},
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
			value: 8,
			message: 'Senha deve ter no mínimo 8 caracteres',
		},
	},
};
