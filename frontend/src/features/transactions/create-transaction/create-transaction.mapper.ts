import { ClientError } from 'graphql-request';

export function mapCreateTransactionError(error: unknown): string {
	if (error instanceof ClientError) {
		const code = error.response.errors?.[0]?.extensions?.code;
		const gqlMessage = error.response.errors?.[0]?.message;
		if (code === 'UNAUTHENTICATED') {
			return 'Sua sessão expirou. Faça login novamente.';
		}
		if (gqlMessage) {
			if (gqlMessage.includes('Categoria não encontrada')) {
				return 'Categoria selecionada não foi encontrada.';
			}
			return gqlMessage;
		}
	}

	return 'Ocorreu um erro ao criar a transação. Tente novamente.';
}
