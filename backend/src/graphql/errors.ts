import { GraphQLError } from 'graphql';

export function unauthenticatedError(): GraphQLError {
	return new GraphQLError('Não autenticado', {
		extensions: { code: 'UNAUTHENTICATED' },
	});
}
