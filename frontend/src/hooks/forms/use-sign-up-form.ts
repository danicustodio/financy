import { useState } from 'react';
import { type RegisterOptions, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { mapSignUpError } from '@/mappers/sign-up.mapper';
import { useSignUpMutation } from '../mutations/use-sign-up-mutation';

export interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

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

export function useSignUpForm() {
	const navigate = useNavigate();
	const [formError, setFormError] = useState<string | null>(null);
	const signUpMutation = useSignUpMutation();

	const form = useForm<SignUpFormData>();

	const onSubmit = form.handleSubmit((data) => {
		setFormError(null);
		signUpMutation.mutate(data, {
			onSuccess: () => {
				navigate('/dashboard');
			},
			onError: (error) => {
				setFormError(mapSignUpError(error));
			},
		});
	});

	return {
		form,
		formError,
		isSubmitting: signUpMutation.isPending,
		onSubmit,
	};
}
