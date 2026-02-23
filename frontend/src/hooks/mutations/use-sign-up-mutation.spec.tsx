import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSignUpMutation } from './use-sign-up-mutation';

const { publicGraphqlRequestMock, setSessionMock } = vi.hoisted(() => ({
	publicGraphqlRequestMock: vi.fn(),
	setSessionMock: vi.fn(),
}));

vi.mock('@/graphql', () => ({
	SIGN_UP_MUTATION: 'SIGN_UP_MUTATION',
}));

vi.mock('@/graphql/graphql-client', () => ({
	publicGraphqlRequest: publicGraphqlRequestMock,
}));

vi.mock('@/stores/authStore', () => ({
	useAuthStore: {
		getState: () => ({
			setSession: setSessionMock,
		}),
	},
}));

describe('useSignUpMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('calls signup mutation and stores session with rememberMe=true', async () => {
		const user = { id: 'user-1', email: 'user@example.com', name: 'John Doe' };
		publicGraphqlRequestMock.mockReturnValue(
			vi.fn().mockResolvedValue({ signUp: { user, token: 'token-123' } }),
		);
		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const { result } = renderHook(() => useSignUpMutation(), { wrapper });

		await act(async () => {
			await result.current.mutateAsync({
				name: 'John Doe',
				email: 'user@example.com',
				password: 'password-123',
			});
		});

		expect(publicGraphqlRequestMock).toHaveBeenCalledWith('SIGN_UP_MUTATION', {
			input: {
				name: 'John Doe',
				email: 'user@example.com',
				password: 'password-123',
			},
		});
		expect(setSessionMock).toHaveBeenCalledWith(user, 'token-123', true);
	});

	it('does not store session when mutation fails', async () => {
		publicGraphqlRequestMock.mockReturnValue(
			vi.fn().mockRejectedValue(new Error('Request failed')),
		);
		const queryClient = new QueryClient({
			defaultOptions: { mutations: { retry: false } },
		});
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const { result } = renderHook(() => useSignUpMutation(), { wrapper });

		await act(async () => {
			try {
				await result.current.mutateAsync({
					name: 'John Doe',
					email: 'user@example.com',
					password: 'password-123',
				});
			} catch {
				// expected
			}
		});

		expect(setSessionMock).not.toHaveBeenCalled();
		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});
