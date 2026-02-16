import { GraphQLClient } from 'graphql-request';
import { useAuthStore } from '@/stores/authStore';

const endpoint = import.meta.env.VITE_API_URL;

const client = new GraphQLClient(endpoint);

export function graphqlRequest<TResult, TVariables>(
	document: string,
	variables?: TVariables,
): () => Promise<TResult> {
	return async () => {
		const token = useAuthStore.getState().token;
		const headers: Record<string, string> = {};
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}
		return client.request({
			document,
			variables: variables as Record<string, unknown> | undefined,
			requestHeaders: headers,
		});
	};
}
