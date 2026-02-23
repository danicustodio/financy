import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useListTransactions } from './use-list-transactions';

const { authGraphqlRequestMock, mapApiTransactionToDomainMock } = vi.hoisted(
	() => ({
		authGraphqlRequestMock: vi.fn(),
		mapApiTransactionToDomainMock: vi.fn((transaction) => ({
			...transaction,
			mapped: true,
		})),
	}),
);

vi.mock('@/graphql', () => ({
	LIST_TRANSACTIONS_QUERY: 'LIST_TRANSACTIONS_QUERY',
}));

vi.mock('@/graphql/graphql-client', () => ({
	authGraphqlRequest: authGraphqlRequestMock,
}));

vi.mock('@/mappers/api-to-domain/transaction.api-to-domain.mapper', () => ({
	mapApiTransactionToDomain: mapApiTransactionToDomainMock,
}));

describe('useListTransactions', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('loads paginated transactions and maps items', async () => {
		authGraphqlRequestMock.mockReturnValue(
			vi.fn().mockResolvedValue({
				transactions: {
					items: [{ id: 'tx-1', description: 'Lunch' }],
					totalCount: 1,
				},
			}),
		);
		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const params = {
			filter: { search: 'lunch' },
			pagination: { page: 1, pageSize: 10 },
		};

		const { result } = renderHook(() => useListTransactions(params), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.data).toEqual({
				items: [{ id: 'tx-1', description: 'Lunch', mapped: true }],
				totalCount: 1,
			});
		});

		expect(authGraphqlRequestMock).toHaveBeenCalledWith(
			'LIST_TRANSACTIONS_QUERY',
			params,
		);
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
		const params = {
			filter: { search: '' },
			pagination: { page: 1, pageSize: 10 },
		};

		const { result } = renderHook(() => useListTransactions(params), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.data).toBeUndefined();
	});
});
