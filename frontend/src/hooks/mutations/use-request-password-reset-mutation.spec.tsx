import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRequestPasswordResetMutation } from './use-request-password-reset-mutation';

const { publicGraphqlRequestMock } = vi.hoisted(() => ({
	publicGraphqlRequestMock: vi.fn(),
}));

vi.mock('@/graphql', () => ({
	REQUEST_PASSWORD_RESET_MUTATION: 'REQUEST_PASSWORD_RESET_MUTATION',
}));

vi.mock('@/graphql/graphql-client', () => ({
	publicGraphqlRequest: publicGraphqlRequestMock,
}));

describe('useRequestPasswordResetMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('calls public mutation with request input', async () => {
		publicGraphqlRequestMock.mockReturnValue(
			vi.fn().mockResolvedValue({ requestPasswordReset: { success: true } }),
		);
		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const { result } = renderHook(() => useRequestPasswordResetMutation(), {
			wrapper,
		});

		await act(async () => {
			await result.current.mutateAsync({ email: 'user@example.com' });
		});

		expect(publicGraphqlRequestMock).toHaveBeenCalledWith(
			'REQUEST_PASSWORD_RESET_MUTATION',
			{
				input: { email: 'user@example.com' },
			},
		);
	});

	it('enters error state when request fails', async () => {
		publicGraphqlRequestMock.mockReturnValue(
			vi.fn().mockRejectedValue(new Error('Request failed')),
		);
		const queryClient = new QueryClient({
			defaultOptions: { mutations: { retry: false } },
		});
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const { result } = renderHook(() => useRequestPasswordResetMutation(), {
			wrapper,
		});

		await act(async () => {
			try {
				await result.current.mutateAsync({ email: 'user@example.com' });
			} catch {
				// expected
			}
		});

		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});
