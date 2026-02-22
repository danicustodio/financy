import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod/v4';
import { mapGraphQLError } from '@/mappers/errors/graphql-error.mapper';
import {
	AUTH_RESET_PASSWORD_ERROR_FALLBACK,
	AUTH_RESET_PASSWORD_ERROR_RULES,
} from '@/mappers/errors/graphql-error-rules';
import { useResetPasswordMutation } from '../mutations/use-reset-password-mutation';

export const resetPasswordSchema = z
	.object({
		password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
		confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
	})
	.refine((values) => values.password === values.confirmPassword, {
		path: ['confirmPassword'],
		message: 'As senhas não conferem',
	});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function useResetPasswordForm(token: string | null) {
	const navigate = useNavigate();
	const [formError, setFormError] = useState<string | null>(null);
	const resetPasswordMutation = useResetPasswordMutation();

	const form = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
	});

	const onSubmit = form.handleSubmit((data) => {
		if (!token) {
			setFormError('Token de recuperação não foi informado.');
			return;
		}

		setFormError(null);
		resetPasswordMutation.mutate(
			{
				token,
				password: data.password,
			},
			{
				onSuccess: () => {
					navigate('/signin?reset=success');
				},
				onError: (error) => {
					setFormError(
						mapGraphQLError(
							error,
							AUTH_RESET_PASSWORD_ERROR_FALLBACK,
							AUTH_RESET_PASSWORD_ERROR_RULES,
						),
					);
				},
			},
		);
	});

	return {
		form,
		formError,
		isSubmitting: resetPasswordMutation.isPending,
		onSubmit,
	};
}
