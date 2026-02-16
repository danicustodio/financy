import { useState } from 'react';
import { type RegisterOptions, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { mapSignInError } from '../../mappers/sign-in.mapper';
import { useLoginMutation } from '../mutations/use-login-mutation';

export interface SignInFormData {
	email: string;
	password: string;
}

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

export function useSignInForm() {
	const navigate = useNavigate();
	const [formError, setFormError] = useState<string | null>(null);
	const loginMutation = useLoginMutation();

	const form = useForm<SignInFormData>();

	const onSubmit = form.handleSubmit((data) => {
		setFormError(null);
		loginMutation.mutate(data, {
			onSuccess: () => {
				navigate('/dashboard');
			},
			onError: (error) => {
				setFormError(mapSignInError(error));
			},
		});
	});

	return {
		form,
		formError,
		isSubmitting: loginMutation.isPending,
		onSubmit,
	};
}
