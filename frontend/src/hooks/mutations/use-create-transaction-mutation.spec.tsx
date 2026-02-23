import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CATEGORIES_SUMMARY_QUERY_KEY } from '../queries/use-categories-summary';
import { DASHBOARD_SUMMARY_QUERY_KEY } from '../queries/use-dashboard-summary';
import { LIST_CATEGORIES_QUERY_KEY } from '../queries/use-list-categories';
import { LIST_TRANSACTIONS_QUERY_KEY } from '../queries/use-list-transactions';
import { useCreateTransactionMutation } from './use-create-transaction-mutation';

const { authGraphqlRequestMock } = vi.hoisted(() => ({
	authGraphqlRequestMock: vi.fn(),
}));

vi.mock('@/graphql', () => ({
	CREATE_TRANSACTION_MUTATION: 'CREATE_TRANSACTION_MUTATION',
}));

vi.mock('@/graphql/graphql-client', () => ({
	authGraphqlRequest: authGraphqlRequestMock,
}));

describe('useCreateTransactionMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('calls GraphQL mutation and invalidates dependent queries on success', async () => {
		const requestMock = vi.fn().mockResolvedValue({
			createTransaction: {
				id: 'transaction-1',
			},
		});
		authGraphqlRequestMock.mockReturnValue(requestMock);

		const queryClient = new QueryClient({
			defaultOptions: {
				mutations: { retry: false },
			},
		});
		const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

		function Wrapper({ children }: { children: ReactNode }) {
			return (
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			);
		}

		const { result } = renderHook(() => useCreateTransactionMutation(), {
			wrapper: Wrapper,
		});

		const input = {
			description: 'Lunch',
			amount: 123.45,
			type: 'expense' as const,
			date: '2026-02-01',
			categoryId: 'category-1',
		};

		await act(async () => {
			await result.current.mutateAsync(input);
		});

		expect(authGraphqlRequestMock).toHaveBeenCalledWith(
			'CREATE_TRANSACTION_MUTATION',
			{ input },
		);
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

		function Wrapper({ children }: { children: ReactNode }) {
			return (
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			);
		}

		const { result } = renderHook(() => useCreateTransactionMutation(), {
			wrapper: Wrapper,
		});

		await act(async () => {
			try {
				await result.current.mutateAsync({
					description: 'Lunch',
					amount: 123.45,
					type: 'expense' as const,
					date: '2026-02-01',
					categoryId: 'category-1',
				});
			} catch {
				// expected
			}
		});

		expect(invalidateSpy).not.toHaveBeenCalled();
	});
});
