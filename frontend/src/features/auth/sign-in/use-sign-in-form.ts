import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { mapSignInError } from './sign-in.mapper';
import type { SignInFormData } from './sign-in.types';
import { useLoginMutation } from './use-login-mutation';

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
