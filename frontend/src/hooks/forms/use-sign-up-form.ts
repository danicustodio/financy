import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { mapSignUpError } from '@/mappers/sign-up.mapper';
import { useSignUpMutation } from '../mutations/use-sign-up-mutation';

export const signUpSchema = z.object({
	name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
	email: z.email('E-mail inválido'),
	password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export function useSignUpForm() {
	const navigate = useNavigate();
	const [formError, setFormError] = useState<string | null>(null);
	const signUpMutation = useSignUpMutation();

	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
	});

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
