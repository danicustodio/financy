import { useMutation } from '@tanstack/react-query';
import { LOGIN_MUTATION } from '@/lib/graphql';
import { publicGraphqlRequest } from '@/lib/graphql/graphql-client';
import { useAuthStore } from '@/stores/authStore';

interface LoginInput {
	email: string;
	password: string;
}

interface LoginResponse {
	login: {
		token: string;
		user: {
			id: string;
			email: string;
			name: string;
		};
	};
}

export function useLoginMutation() {
	return useMutation({
		mutationFn: async (input: LoginInput) => {
			const data = await publicGraphqlRequest<
				LoginResponse,
				{ input: LoginInput }
			>(LOGIN_MUTATION, { input })();

			return data.login;
		},
		onSuccess: (data) => {
			useAuthStore.getState().setSession(data.user, data.token);
		},
	});
}
