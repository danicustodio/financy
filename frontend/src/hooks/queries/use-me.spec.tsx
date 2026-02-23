import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useMe } from './use-me';

const { authGraphqlRequestMock } = vi.hoisted(() => ({
	authGraphqlRequestMock: vi.fn(),
}));

vi.mock('@/graphql', () => ({
	ME_QUERY: 'ME_QUERY',
}));

vi.mock('@/graphql/graphql-client', () => ({
	authGraphqlRequest: authGraphqlRequestMock,
}));

describe('useMe', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('uses me query key and selects me payload', async () => {
		authGraphqlRequestMock.mockReturnValue(
			vi.fn().mockResolvedValue({
				me: { id: 'user-1', email: 'user@example.com', name: 'John Doe' },
			}),
		);
		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useMe(), { wrapper });

		await waitFor(() => {
			expect(result.current.data).toEqual({
				id: 'user-1',
				email: 'user@example.com',
				name: 'John Doe',
			});
		});

		expect(authGraphqlRequestMock).toHaveBeenCalledWith('ME_QUERY');
	});

	it('returns error state when request fails', async () => {
		authGraphqlRequestMock.mockReturnValue(
			vi.fn().mockRejectedValue(new Error('Network error')),
		);
		const queryClient = new QueryClient({
			defaultOptions: { queries: { retry: false } },
		});
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useMe(), { wrapper });

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.data).toBeUndefined();
	});
});
