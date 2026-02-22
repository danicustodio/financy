import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { reportUiError } from '@/lib/error-reporting';
import { ErrorBoundary } from './error-boundary.component';

vi.mock('@/lib/error-reporting', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/lib/error-reporting')>();
	return {
		...actual,
		reportUiError: vi.fn(),
	};
});

function ThrowingComponent({ shouldThrow = true }: { shouldThrow?: boolean }) {
	if (shouldThrow) {
		throw new Error('boom');
	}

	return <div>ok</div>;
}

describe('ErrorBoundary', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders children when there is no error', () => {
		render(
			<ErrorBoundary scope="app">
				<div>content</div>
			</ErrorBoundary>,
		);

		expect(screen.getByText('content')).toBeInTheDocument();
	});

	it('renders the default fallback when a child throws', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		render(
			<ErrorBoundary scope="app">
				<ThrowingComponent />
			</ErrorBoundary>,
		);

		expect(screen.getByRole('alert')).toHaveTextContent('Algo deu errado.');

		consoleSpy.mockRestore();
	});

	it('reports the error through reporter and onError callback', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		const onError = vi.fn();

		render(
			<ErrorBoundary scope="layout" onError={onError}>
				<ThrowingComponent />
			</ErrorBoundary>,
		);

		expect(reportUiError).toHaveBeenCalled();
		expect(onError).toHaveBeenCalled();

		const payload = onError.mock.calls[0][0];
		expect(payload.scope).toBe('layout');
		expect(payload.error).toBeInstanceOf(Error);
		expect(typeof payload.errorId).toBe('string');
		expect(payload.errorId.length).toBeGreaterThan(0);

		consoleSpy.mockRestore();
	});

	it('resets when resetKeys change', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		const { rerender } = render(
			<ErrorBoundary scope="section" resetKeys={['first']}>
				<ThrowingComponent />
			</ErrorBoundary>,
		);

		expect(screen.getByRole('alert')).toBeInTheDocument();

		rerender(
			<ErrorBoundary scope="section" resetKeys={['second']}>
				<ThrowingComponent shouldThrow={false} />
			</ErrorBoundary>,
		);

		expect(screen.getByText('ok')).toBeInTheDocument();
		consoleSpy.mockRestore();
	});
});
