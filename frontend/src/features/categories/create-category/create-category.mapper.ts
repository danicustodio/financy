import { ClientError } from 'graphql-request';

export function mapCreateCategoryError(error: unknown): string {
	if (error instanceof ClientError) {
		const code = error.response.errors?.[0]?.extensions?.code;
		const gqlMessage = error.response.errors?.[0]?.message;
		if (code === 'UNAUTHENTICATED') {
			return 'Sua sessão expirou. Faça login novamente.';
		}
		if (gqlMessage) {
			if (
				gqlMessage.includes('Unique constraint') ||
				gqlMessage.includes('unique')
			) {
				return 'Já existe uma categoria com este nome.';
			}
			return gqlMessage;
		}
	}

	return 'Ocorreu um erro ao criar a categoria. Tente novamente.';
}
