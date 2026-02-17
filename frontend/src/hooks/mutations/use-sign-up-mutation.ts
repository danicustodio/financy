import { useMutation } from '@tanstack/react-query';
import { SIGN_UP_MUTATION } from '@/graphql';
import { publicGraphqlRequest } from '@/graphql/graphql-client';
import { useAuthStore } from '@/stores/authStore';
import type { SignUpInput, SignUpResponse } from '@/types/api/operations';

export function useSignUpMutation() {
	return useMutation({
		mutationFn: async (input: SignUpInput) => {
			const data = await publicGraphqlRequest<
				SignUpResponse,
				{ input: SignUpInput }
			>(SIGN_UP_MUTATION, {
				input,
			})();

			return data.signUp;
		},
		onSuccess: (data) => {
			useAuthStore.getState().setSession(data.user, data.token);
		},
	});
}
