import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useListCategories } from './use-list-categories';

const { authGraphqlRequestMock, mapApiCategoryToDomainMock } = vi.hoisted(
	() => ({
		authGraphqlRequestMock: vi.fn(),
		mapApiCategoryToDomainMock: vi.fn((category) => ({
			...category,
			mapped: true,
		})),
	}),
);

vi.mock('@/graphql', () => ({
	LIST_CATEGORIES_QUERY: 'LIST_CATEGORIES_QUERY',
}));

vi.mock('@/graphql/graphql-client', () => ({
	authGraphqlRequest: authGraphqlRequestMock,
}));

vi.mock('@/mappers/api-to-domain/category.api-to-domain.mapper', () => ({
	mapApiCategoryToDomain: mapApiCategoryToDomainMock,
}));

describe('useListCategories', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('loads categories and maps them to domain', async () => {
		authGraphqlRequestMock.mockReturnValue(
			vi.fn().mockResolvedValue({
				categories: [{ id: 'category-1', title: 'Food' }],
			}),
		);
		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useListCategories(), { wrapper });

		await waitFor(() => {
			expect(result.current.data).toEqual([
				{ id: 'category-1', title: 'Food', mapped: true },
			]);
		});

		expect(mapApiCategoryToDomainMock.mock.calls[0]?.[0]).toEqual({
			id: 'category-1',
			title: 'Food',
		});
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

		const { result } = renderHook(() => useListCategories(), { wrapper });

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.data).toBeUndefined();
	});
});
