import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { mapGraphQLError } from '@/mappers/errors/graphql-error.mapper';
import {
	UPDATE_ME_ERROR_FALLBACK,
	UPDATE_ME_ERROR_RULES,
} from '@/mappers/errors/graphql-error-rules';
import type { UserProfile } from '@/types/domain/user';
import { useUpdateMeMutation } from '../mutations/use-update-me-mutation';

const profileSchema = z.object({
	name: z.string().trim().min(2, 'Nome deve ter ao menos 2 caracteres'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm(profile: UserProfile | undefined) {
	const [formError, setFormError] = useState<string | null>(null);
	const updateMeMutation = useUpdateMeMutation();

	const form = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: '',
		},
	});

	useEffect(() => {
		if (!profile) return;
		form.reset({
			name: profile.name,
		});
	}, [profile, form]);

	const onSubmit = form.handleSubmit(async (data) => {
		if (!profile) return;
		setFormError(null);

		const name = data.name.trim();
		if (name === profile.name) {
			return;
		}

		try {
			await updateMeMutation.mutateAsync({ name });
		} catch (error) {
			setFormError(
				mapGraphQLError(error, UPDATE_ME_ERROR_FALLBACK, UPDATE_ME_ERROR_RULES),
			);
		}
	});

	return {
		form,
		formError,
		isSubmitting: updateMeMutation.isPending,
		onSubmit,
	};
}
