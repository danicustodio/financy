import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCategoriesSummary } from './use-categories-summary';

const { authGraphqlRequestMock, toCategoryColorMock, toCategoryIconNameMock } =
	vi.hoisted(() => ({
		authGraphqlRequestMock: vi.fn(),
		toCategoryColorMock: vi.fn(() => 'green'),
		toCategoryIconNameMock: vi.fn(() => 'utensils'),
	}));

vi.mock('@/graphql', () => ({
	CATEGORIES_SUMMARY_QUERY: 'CATEGORIES_SUMMARY_QUERY',
}));

vi.mock('@/graphql/graphql-client', () => ({
	authGraphqlRequest: authGraphqlRequestMock,
}));

vi.mock('@/mappers/api-to-domain/category.api-to-domain.mapper', () => ({
	toCategoryColor: toCategoryColorMock,
	toCategoryIconName: toCategoryIconNameMock,
}));

describe('useCategoriesSummary', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('maps mostUsedCategory icon and color', async () => {
		authGraphqlRequestMock.mockReturnValue(
			vi.fn().mockResolvedValue({
				categoriesSummary: {
					totalCategories: 2,
					totalTransactions: 10,
					mostUsedCategory: {
						id: 'category-1',
						title: 'Food',
						icon: 'UNKNOWN_ICON',
						color: 'UNKNOWN_COLOR',
					},
				},
			}),
		);
		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useCategoriesSummary(), { wrapper });

		await waitFor(() => {
			expect(result.current.data).toEqual({
				totalCategories: 2,
				totalTransactions: 10,
				mostUsedCategory: {
					id: 'category-1',
					title: 'Food',
					icon: 'utensils',
					color: 'green',
				},
			});
		});

		expect(toCategoryIconNameMock).toHaveBeenCalledWith('UNKNOWN_ICON');
		expect(toCategoryColorMock).toHaveBeenCalledWith('UNKNOWN_COLOR');
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

		const { result } = renderHook(() => useCategoriesSummary(), { wrapper });

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.data).toBeUndefined();
	});
});
