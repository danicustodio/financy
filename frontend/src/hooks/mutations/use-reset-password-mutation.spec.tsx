import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useResetPasswordMutation } from './use-reset-password-mutation';

const { publicGraphqlRequestMock } = vi.hoisted(() => ({
	publicGraphqlRequestMock: vi.fn(),
}));

vi.mock('@/graphql', () => ({
	RESET_PASSWORD_MUTATION: 'RESET_PASSWORD_MUTATION',
}));

vi.mock('@/graphql/graphql-client', () => ({
	publicGraphqlRequest: publicGraphqlRequestMock,
}));

describe('useResetPasswordMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('calls public mutation with reset payload', async () => {
		publicGraphqlRequestMock.mockReturnValue(
			vi.fn().mockResolvedValue({ resetPassword: { success: true } }),
		);
		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const { result } = renderHook(() => useResetPasswordMutation(), {
			wrapper,
		});

		await act(async () => {
			await result.current.mutateAsync({
				token: 'token-123',
				password: 'password-123',
			});
		});

		expect(publicGraphqlRequestMock).toHaveBeenCalledWith(
			'RESET_PASSWORD_MUTATION',
			{
				input: {
					token: 'token-123',
					password: 'password-123',
				},
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
		const { result } = renderHook(() => useResetPasswordMutation(), {
			wrapper,
		});

		await act(async () => {
			try {
				await result.current.mutateAsync({
					token: 'token-123',
					password: 'password-123',
				});
			} catch {
				// expected
			}
		});

		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});
