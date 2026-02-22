import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod/v4';
import { mapGraphQLError } from '@/mappers/errors/graphql-error.mapper';
import {
	AUTH_SIGN_IN_ERROR_FALLBACK,
	AUTH_SIGN_IN_ERROR_RULES,
} from '@/mappers/errors/graphql-error-rules';
import type { SignInInput } from '@/types/api/operations';
import { useLoginMutation } from '../mutations/use-login-mutation';

export const signInSchema = z.object({
	email: z.email('E-mail inválido'),
	password: z.string().min(1, 'Senha é obrigatória'),
	rememberMe: z.boolean(),
});

export type SignInFormData = SignInInput & {
	rememberMe: boolean;
};

export function useSignInForm() {
	const navigate = useNavigate();
	const [formError, setFormError] = useState<string | null>(null);
	const loginMutation = useLoginMutation();

	const form = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			rememberMe: false,
		},
	});

	const onSubmit = form.handleSubmit((data) => {
		setFormError(null);
		loginMutation.mutate(data, {
			onSuccess: () => {
				navigate('/dashboard');
			},
			onError: (error) => {
				setFormError(
					mapGraphQLError(
						error,
						AUTH_SIGN_IN_ERROR_FALLBACK,
						AUTH_SIGN_IN_ERROR_RULES,
					),
				);
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
