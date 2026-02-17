import { GraphQLError } from 'graphql';
import { isAppError } from './app-error';
import { errorCodes } from './error-codes';

export function toGraphQLError(error: unknown): GraphQLError {
	if (error instanceof GraphQLError) {
		return error;
	}

	if (isAppError(error)) {
		return new GraphQLError(error.message, {
			extensions: {
				code: error.code,
				details: error.details,
			},
		});
	}

	return new GraphQLError('Internal server error', {
		extensions: {
			code: errorCodes.INTERNAL_SERVER_ERROR,
		},
	});
}

export async function mapResolverError<T>(
	resolver: () => Promise<T>,
): Promise<T> {
	try {
		return await resolver();
	} catch (error) {
		throw toGraphQLError(error);
	}
}
