import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { mapSignUpError } from './sign-up.mapper';
import type { SignUpFormData } from './sign-up.types';

export function useSignUpForm() {
	const navigate = useNavigate();
	const signup = useAuthStore((state) => state.signup);
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm<SignUpFormData>();

	const onSubmit = form.handleSubmit(async (data) => {
		setFormError(null);

		try {
			await signup(data.name, data.email, data.password);
			navigate('/dashboard');
		} catch (error) {
			setFormError(mapSignUpError(error));
		}
	});

	return {
		form,
		formError,
		onSubmit,
	};
}
