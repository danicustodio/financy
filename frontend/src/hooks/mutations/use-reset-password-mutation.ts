import { useMutation } from '@tanstack/react-query';
import { RESET_PASSWORD_MUTATION } from '@/graphql';
import { publicGraphqlRequest } from '@/graphql/graphql-client';
import type { ResetPasswordInput, ResetPasswordResponse } from '@/types/api/operations';

export function useResetPasswordMutation() {
	return useMutation({
		mutationFn: async (input: ResetPasswordInput) => {
			const data = await publicGraphqlRequest<
				ResetPasswordResponse,
				{ input: ResetPasswordInput }
			>(RESET_PASSWORD_MUTATION, {
				input,
			})();

			return data.resetPassword;
		},
	});
}
