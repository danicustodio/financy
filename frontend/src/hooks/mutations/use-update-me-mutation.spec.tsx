import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ME_QUERY_KEY } from '../queries/use-me';
import { useUpdateMeMutation } from './use-update-me-mutation';

const { authGraphqlRequestMock, setUserMock } = vi.hoisted(() => ({
	authGraphqlRequestMock: vi.fn(),
	setUserMock: vi.fn(),
}));

vi.mock('@/graphql', () => ({
	UPDATE_ME_MUTATION: 'UPDATE_ME_MUTATION',
}));

vi.mock('@/graphql/graphql-client', () => ({
	authGraphqlRequest: authGraphqlRequestMock,
}));

vi.mock('@/stores/authStore', () => ({
	useAuthStore: {
		getState: () => ({ setUser: setUserMock }),
	},
}));

describe('useUpdateMeMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('updates auth user and invalidates me query on success', async () => {
		const updatedUser = {
			id: 'user-1',
			email: 'user@example.com',
			name: 'Jane Doe',
		};
		authGraphqlRequestMock.mockReturnValue(
			vi.fn().mockResolvedValue({ updateMe: updatedUser }),
		);
		const queryClient = new QueryClient({
			defaultOptions: { mutations: { retry: false } },
		});
		const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const { result } = renderHook(() => useUpdateMeMutation(), { wrapper });

		await act(async () => {
			await result.current.mutateAsync({ name: 'Jane Doe' });
		});

		expect(setUserMock).toHaveBeenCalledWith(updatedUser);
		expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ME_QUERY_KEY });
	});

	it('does not update store or invalidate queries when mutation fails', async () => {
		authGraphqlRequestMock.mockReturnValue(
			vi.fn().mockRejectedValue(new Error('Request failed')),
		);
		const queryClient = new QueryClient({
			defaultOptions: { mutations: { retry: false } },
		});
		const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const { result } = renderHook(() => useUpdateMeMutation(), { wrapper });

		await act(async () => {
			try {
				await result.current.mutateAsync({ name: 'Jane Doe' });
			} catch {
				// expected
			}
		});

		expect(setUserMock).not.toHaveBeenCalled();
		expect(invalidateSpy).not.toHaveBeenCalled();
	});
});
