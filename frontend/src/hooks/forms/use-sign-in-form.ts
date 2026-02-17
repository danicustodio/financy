import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod/v4';
import { mapSignInError } from '@/mappers/sign-in.mapper';
import type { SignInInput } from '@/types/api/operations';
import { useLoginMutation } from '../mutations/use-login-mutation';

export const signInSchema = z.object({
	email: z.email('E-mail inválido'),
	password: z.string().min(1, 'Senha é obrigatória'),
});

export type SignInFormData = SignInInput;

export function useSignInForm() {
	const navigate = useNavigate();
	const [formError, setFormError] = useState<string | null>(null);
	const loginMutation = useLoginMutation();

	const form = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
	});

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
