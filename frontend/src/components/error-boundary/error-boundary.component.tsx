import { Component, type ErrorInfo, type ReactNode } from 'react';
import {
	type ErrorBoundaryScope,
	reportUiError,
	type UiErrorReportPayload,
} from '@/lib/error-reporting';
import { ErrorFallback } from './error-fallback.component';

export interface ErrorFallbackRenderContext {
	error: Error;
	errorId: string;
	scope: ErrorBoundaryScope;
	resetErrorBoundary: () => void;
}

interface ErrorBoundaryProps {
	children: ReactNode;
	scope: ErrorBoundaryScope;
	resetKeys?: unknown[];
	fallback?: ReactNode | ((context: ErrorFallbackRenderContext) => ReactNode);
	onError?: (payload: UiErrorReportPayload) => void;
}

interface ErrorBoundaryState {
	error: Error | null;
	errorId: string | null;
}

const INITIAL_STATE: ErrorBoundaryState = {
	error: null,
	errorId: null,
};

function areArraysEqual(first: unknown[] = [], second: unknown[] = []) {
	if (first.length !== second.length) {
		return false;
	}

	return first.every((item, index) => Object.is(item, second[index]));
}

function createErrorId() {
	return `err-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	override state: ErrorBoundaryState = INITIAL_STATE;

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return {
			error,
			errorId: createErrorId(),
		};
	}

	override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		const errorId = this.state.errorId ?? createErrorId();
		const payload: UiErrorReportPayload = {
			error,
			errorId,
			scope: this.props.scope,
			componentStack: errorInfo.componentStack ?? undefined,
		};

		reportUiError(payload);
		this.props.onError?.(payload);
	}

	override componentDidUpdate(previousProps: ErrorBoundaryProps) {
		const hasError = this.state.error !== null;
		if (!hasError) {
			return;
		}

		const shouldReset = !areArraysEqual(
			previousProps.resetKeys,
			this.props.resetKeys,
		);
		if (shouldReset) {
			this.resetErrorBoundary();
		}
	}

	private resetErrorBoundary = () => {
		this.setState(INITIAL_STATE);
	};

	override render() {
		const { error, errorId } = this.state;
		const { children, fallback, scope } = this.props;

		if (!error || !errorId) {
			return children;
		}

		if (typeof fallback === 'function') {
			return fallback({
				error,
				errorId,
				scope,
				resetErrorBoundary: this.resetErrorBoundary,
			});
		}

		if (fallback) {
			return fallback;
		}

		return <ErrorFallback errorId={errorId} scope={scope} />;
	}
}

type SectionErrorBoundaryProps = Omit<ErrorBoundaryProps, 'scope'>;

export function SectionErrorBoundary(props: SectionErrorBoundaryProps) {
	return <ErrorBoundary scope="section" {...props} />;
}
