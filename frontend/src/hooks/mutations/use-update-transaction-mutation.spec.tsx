import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CATEGORIES_SUMMARY_QUERY_KEY } from '../queries/use-categories-summary';
import { DASHBOARD_SUMMARY_QUERY_KEY } from '../queries/use-dashboard-summary';
import { LIST_CATEGORIES_QUERY_KEY } from '../queries/use-list-categories';
import { LIST_TRANSACTIONS_QUERY_KEY } from '../queries/use-list-transactions';
import { useUpdateTransactionMutation } from './use-update-transaction-mutation';

const { authGraphqlRequestMock } = vi.hoisted(() => ({
	authGraphqlRequestMock: vi.fn(),
}));

vi.mock('@/graphql', () => ({
	UPDATE_TRANSACTION_MUTATION: 'UPDATE_TRANSACTION_MUTATION',
}));

vi.mock('@/graphql/graphql-client', () => ({
	authGraphqlRequest: authGraphqlRequestMock,
}));

describe('useUpdateTransactionMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('invalidates dependent transaction queries on success', async () => {
		authGraphqlRequestMock.mockReturnValue(
			vi.fn().mockResolvedValue({ updateTransaction: { id: 'tx-1' } }),
		);
		const queryClient = new QueryClient({
			defaultOptions: { mutations: { retry: false } },
		});
		const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const { result } = renderHook(() => useUpdateTransactionMutation(), {
			wrapper,
		});

		await act(async () => {
			await result.current.mutateAsync({
				id: 'tx-1',
				description: 'Lunch',
				amount: 20,
				type: 'expense',
				date: '2026-02-23T00:00:00.000Z',
				categoryId: 'category-1',
			});
		});

		expect(invalidateSpy).toHaveBeenCalledWith({
			queryKey: LIST_TRANSACTIONS_QUERY_KEY,
		});
		expect(invalidateSpy).toHaveBeenCalledWith({
			queryKey: LIST_CATEGORIES_QUERY_KEY,
		});
		expect(invalidateSpy).toHaveBeenCalledWith({
			queryKey: DASHBOARD_SUMMARY_QUERY_KEY,
		});
		expect(invalidateSpy).toHaveBeenCalledWith({
			queryKey: CATEGORIES_SUMMARY_QUERY_KEY,
		});
	});

	it('does not invalidate queries when mutation fails', async () => {
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
		const { result } = renderHook(() => useUpdateTransactionMutation(), {
			wrapper,
		});

		await act(async () => {
			try {
				await result.current.mutateAsync({
					id: 'tx-1',
					description: 'Lunch',
					amount: 20,
					type: 'expense',
					date: '2026-02-23T00:00:00.000Z',
					categoryId: 'category-1',
				});
			} catch {
				// expected
			}
		});

		expect(invalidateSpy).not.toHaveBeenCalled();
	});
});
