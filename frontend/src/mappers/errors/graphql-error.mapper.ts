import { ClientError } from 'graphql-request';

export interface ErrorRule {
	code?: string;
	messageIncludes?: string;
	userMessage: string;
}

export function mapGraphQLError(
	error: unknown,
	fallbackMessage: string,
	rules: ErrorRule[] = [],
): string {
	if (!(error instanceof ClientError)) return fallbackMessage;

	const gqlError = error.response.errors?.[0];
	if (!gqlError) return fallbackMessage;

	const code = gqlError.extensions?.code as string | undefined;

	for (const rule of rules) {
		if (rule.code && code === rule.code) return rule.userMessage;
		if (
			rule.messageIncludes &&
			gqlError.message?.includes(rule.messageIncludes)
		)
			return rule.userMessage;
	}

	return gqlError.message || fallbackMessage;
}
