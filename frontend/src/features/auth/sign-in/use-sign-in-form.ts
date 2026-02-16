import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { mapSignInError } from './sign-in.mapper';
import type { SignInFormData } from './sign-in.types';

export function useSignInForm() {
	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm<SignInFormData>();

	const onSubmit = form.handleSubmit(async (data) => {
		setFormError(null);

		try {
			await login(data.email, data.password);
			navigate('/dashboard');
		} catch (error) {
			setFormError(mapSignInError(error));
		}
	});

	return {
		form,
		formError,
		onSubmit,
	};
}
