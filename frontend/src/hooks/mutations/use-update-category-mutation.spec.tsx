import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CATEGORIES_SUMMARY_QUERY_KEY } from '../queries/use-categories-summary';
import { LIST_CATEGORIES_QUERY_KEY } from '../queries/use-list-categories';
import { useUpdateCategoryMutation } from './use-update-category-mutation';

const { authGraphqlRequestMock } = vi.hoisted(() => ({
	authGraphqlRequestMock: vi.fn(),
}));

vi.mock('@/graphql', () => ({
	UPDATE_CATEGORY_MUTATION: 'UPDATE_CATEGORY_MUTATION',
}));

vi.mock('@/graphql/graphql-client', () => ({
	authGraphqlRequest: authGraphqlRequestMock,
}));

describe('useUpdateCategoryMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('invalidates categories and categories summary queries on success', async () => {
		authGraphqlRequestMock.mockReturnValue(
			vi.fn().mockResolvedValue({ updateCategory: { id: 'category-1' } }),
		);
		const queryClient = new QueryClient({
			defaultOptions: { mutations: { retry: false } },
		});
		const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const { result } = renderHook(() => useUpdateCategoryMutation(), {
			wrapper,
		});

		await act(async () => {
			await result.current.mutateAsync({
				id: 'category-1',
				title: 'Food',
				description: 'Meals',
				icon: 'utensils',
				color: 'green',
			});
		});

		expect(invalidateSpy).toHaveBeenCalledWith({
			queryKey: LIST_CATEGORIES_QUERY_KEY,
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
		const { result } = renderHook(() => useUpdateCategoryMutation(), {
			wrapper,
		});

		await act(async () => {
			try {
				await result.current.mutateAsync({
					id: 'category-1',
					title: 'Food',
					description: 'Meals',
					icon: 'utensils',
					color: 'green',
				});
			} catch {
				// expected
			}
		});

		expect(invalidateSpy).not.toHaveBeenCalled();
	});
});
