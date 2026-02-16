import { ClientError, GraphQLClient } from 'graphql-request';
import { queryClient } from '@/lib/query-client';
import { useAuthStore } from '@/stores/authStore';

const endpoint = import.meta.env.VITE_API_URL;
const client = new GraphQLClient(endpoint);

export function requestGraphql<TResult, TVariables>(
	document: string,
	variables?: TVariables,
	requestHeaders?: Record<string, string>,
): Promise<TResult> {
	return client.request({
		document,
		variables: variables as Record<string, unknown> | undefined,
		requestHeaders,
	});
}

export function publicGraphqlRequest<TResult, TVariables>(
	document: string,
	variables?: TVariables,
): () => Promise<TResult> {
	return async () => requestGraphql<TResult, TVariables>(document, variables);
}

function isUnauthenticatedError(error: unknown): boolean {
	if (!(error instanceof ClientError)) {
		return false;
	}

	const hasAuthCode = error.response.errors?.some(
		(graphqlError) => graphqlError.extensions?.code === 'UNAUTHENTICATED',
	);

	if (hasAuthCode) {
		return true;
	}

	if (error.response.status === 401) {
		return true;
	}

	return (
		error.response.errors?.some((graphqlError) =>
			graphqlError.message.includes('Não autenticado'),
		) ?? false
	);
}

export function authGraphqlRequest<TResult, TVariables>(
	document: string,
	variables?: TVariables,
): () => Promise<TResult> {
	return async () => {
		const token = useAuthStore.getState().token;
		const headers: Record<string, string> = {};

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		try {
			return await requestGraphql<TResult, TVariables>(
				document,
				variables,
				headers,
			);
		} catch (error) {
			if (isUnauthenticatedError(error)) {
				useAuthStore.getState().logout();
				queryClient.clear();
				window.location.assign('/signin');
			}

			throw error;
		}
	};
}
