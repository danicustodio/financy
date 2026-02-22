import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UPDATE_ME_MUTATION } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import { useAuthStore } from '@/stores/authStore';
import type { UpdateMeInput, UpdateMeResponse } from '@/types/api/operations';
import { ME_QUERY_KEY } from '../queries/use-me';

export function useUpdateMeMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: UpdateMeInput) =>
			authGraphqlRequest<UpdateMeResponse, { input: UpdateMeInput }>(
				UPDATE_ME_MUTATION,
				{ input },
			)(),
		onSuccess: async (data) => {
			useAuthStore.getState().setUser(data.updateMe);
			await queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY });
		},
	});
}
