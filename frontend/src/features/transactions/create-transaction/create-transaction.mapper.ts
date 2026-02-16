import { ClientError } from 'graphql-request';

export function mapCreateTransactionError(error: unknown): string {
	if (error instanceof ClientError) {
		const gqlMessage = error.response.errors?.[0]?.message;
		if (gqlMessage) {
			if (gqlMessage.includes('Não autenticado')) {
				return 'Sua sessão expirou. Faça login novamente.';
			}
			if (gqlMessage.includes('Categoria não encontrada')) {
				return 'Categoria selecionada não foi encontrada.';
			}
			return gqlMessage;
		}
	}

	return 'Ocorreu um erro ao criar a transação. Tente novamente.';
}
