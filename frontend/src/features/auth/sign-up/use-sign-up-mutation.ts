import { useMutation } from '@tanstack/react-query';
import { SIGN_UP_MUTATION } from '@/lib/graphql';
import { publicGraphqlRequest } from '@/lib/graphql/graphql-client';
import { useAuthStore } from '@/stores/authStore';

interface SignUpInput {
	name: string;
	email: string;
	password: string;
}

interface SignUpResponse {
	signUp: {
		token: string;
		user: {
			id: string;
			email: string;
			name: string;
		};
	};
}

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
