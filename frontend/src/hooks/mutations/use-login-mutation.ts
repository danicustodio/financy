import { useMutation } from '@tanstack/react-query';
import { LOGIN_MUTATION } from '@/graphql';
import { publicGraphqlRequest } from '@/graphql/graphql-client';
import { useAuthStore } from '@/stores/authStore';
import type { LoginResponse, SignInInput } from '@/types/api/operations';

type LoginMutationInput = SignInInput & {
	rememberMe: boolean;
};

export function useLoginMutation() {
	return useMutation({
		mutationFn: async ({ rememberMe: _rememberMe, ...input }: LoginMutationInput) => {
			const data = await publicGraphqlRequest<
				LoginResponse,
				{ input: SignInInput }
			>(LOGIN_MUTATION, { input })();

			return data.login;
		},
		onSuccess: (data, variables) => {
			useAuthStore
				.getState()
				.setSession(data.user, data.token, variables.rememberMe);
		},
	});
}
