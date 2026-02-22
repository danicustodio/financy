import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLoginMutation } from './use-login-mutation';

const { publicGraphqlRequestMock, setSessionMock } = vi.hoisted(() => ({
	publicGraphqlRequestMock: vi.fn(),
	setSessionMock: vi.fn(),
}));

vi.mock('@/graphql', () => ({
	LOGIN_MUTATION: 'LOGIN_MUTATION',
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

describe('useLoginMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('sends only credentials to GraphQL and forwards rememberMe to the store', async () => {
		const user = {
			id: 'user-1',
			email: 'user@example.com',
			name: 'John Doe',
		};
		const requestMock = vi.fn().mockResolvedValue({
			login: {
				user,
				token: 'token-123',
			},
		});
		publicGraphqlRequestMock.mockReturnValue(requestMock);

		const queryClient = new QueryClient({
			defaultOptions: {
				mutations: {
					retry: false,
				},
			},
		});

		function Wrapper({ children }: { children: ReactNode }) {
			return (
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			);
		}

		const { result } = renderHook(() => useLoginMutation(), {
			wrapper: Wrapper,
		});

		await act(async () => {
			await result.current.mutateAsync({
				email: 'user@example.com',
				password: 'password-123',
				rememberMe: false,
			});
		});

		expect(publicGraphqlRequestMock).toHaveBeenCalledWith('LOGIN_MUTATION', {
			input: {
				email: 'user@example.com',
				password: 'password-123',
			},
		});
		expect(setSessionMock).toHaveBeenCalledWith(user, 'token-123', false);
	});
});
