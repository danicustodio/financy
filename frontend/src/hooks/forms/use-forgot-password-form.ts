import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { mapGraphQLError } from '@/mappers/errors/graphql-error.mapper';
import {
	AUTH_FORGOT_PASSWORD_ERROR_FALLBACK,
	AUTH_FORGOT_PASSWORD_ERROR_RULES,
} from '@/mappers/errors/graphql-error-rules';
import { useRequestPasswordResetMutation } from '../mutations/use-request-password-reset-mutation';

export const forgotPasswordSchema = z.object({
	email: z.email('E-mail inválido'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function useForgotPasswordForm() {
	const [formError, setFormError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const requestPasswordResetMutation = useRequestPasswordResetMutation();

	const form = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	const onSubmit = form.handleSubmit((data) => {
		setFormError(null);
		requestPasswordResetMutation.mutate(data, {
			onSuccess: () => {
				setIsSuccess(true);
			},
			onError: (error) => {
				setFormError(
					mapGraphQLError(
						error,
						AUTH_FORGOT_PASSWORD_ERROR_FALLBACK,
						AUTH_FORGOT_PASSWORD_ERROR_RULES,
					),
				);
			},
		});
	});

	return {
		form,
		formError,
		isSuccess,
		isSubmitting: requestPasswordResetMutation.isPending,
		onSubmit,
	};
}
