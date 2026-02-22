import { useMutation } from '@tanstack/react-query';
import { REQUEST_PASSWORD_RESET_MUTATION } from '@/graphql';
import { publicGraphqlRequest } from '@/graphql/graphql-client';
import type {
	RequestPasswordResetInput,
	RequestPasswordResetResponse,
} from '@/types/api/operations';

export function useRequestPasswordResetMutation() {
	return useMutation({
		mutationFn: async (input: RequestPasswordResetInput) => {
			const data = await publicGraphqlRequest<
				RequestPasswordResetResponse,
				{ input: RequestPasswordResetInput }
			>(REQUEST_PASSWORD_RESET_MUTATION, {
				input,
			})();

			return data.requestPasswordReset;
		},
	});
}
