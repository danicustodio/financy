export type ErrorBoundaryScope = 'app' | 'layout' | 'section';

export interface UiErrorReportPayload {
	error: Error;
	scope: ErrorBoundaryScope;
	errorId: string;
	componentStack?: string;
}

export function reportUiError(payload: UiErrorReportPayload) {
	if (import.meta.env.DEV) {
		console.error(
			`[ui-error][scope:${payload.scope}][id:${payload.errorId}]`,
			payload.error,
			payload.componentStack,
		);
	}
}
