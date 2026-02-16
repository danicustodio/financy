import { ClientError } from 'graphql-request';

export function mapSignUpError(error: unknown): string {
	if (error instanceof ClientError) {
		const gqlMessage = error.response.errors?.[0]?.message;
		if (gqlMessage) {
			if (gqlMessage.includes('Unique constraint')) {
				return 'Este e-mail já está em uso';
			}
			return gqlMessage;
		}
	}

	return 'Ocorreu um erro ao criar sua conta. Tente novamente.';
}
