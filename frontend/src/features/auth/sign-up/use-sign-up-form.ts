import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { mapSignUpError } from './sign-up.mapper';
import type { SignUpFormData } from './sign-up.types';
import { useSignUpMutation } from './use-sign-up-mutation';

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
