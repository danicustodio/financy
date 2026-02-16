import { ClientError } from 'graphql-request';

export function mapSignInError(error: unknown): string {
	if (error instanceof ClientError) {
		const gqlMessage = error.response.errors?.[0]?.message;
		if (gqlMessage) {
			return gqlMessage;
		}
	}

	return 'Ocorreu um erro ao fazer login. Tente novamente.';
}
