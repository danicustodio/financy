import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDashboardSummary } from './use-dashboard-summary';

const { authGraphqlRequestMock } = vi.hoisted(() => ({
	authGraphqlRequestMock: vi.fn(),
}));

vi.mock('@/graphql', () => ({
	DASHBOARD_SUMMARY_QUERY: 'DASHBOARD_SUMMARY_QUERY',
}));

vi.mock('@/graphql/graphql-client', () => ({
	authGraphqlRequest: authGraphqlRequestMock,
}));

describe('useDashboardSummary', () => {
	beforeEach(() => {
		vi.useFakeTimers({ toFake: ['Date'] });
		vi.setSystemTime(new Date('2026-02-15'));
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('uses current month/year in query variables and selects summary', async () => {
		authGraphqlRequestMock.mockReturnValue(
			vi.fn().mockResolvedValue({
				dashboardSummary: {
					monthlyIncome: 10,
					monthlyExpense: 5,
					totalBalance: 5,
				},
			}),
		);
		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useDashboardSummary(), { wrapper });

		await waitFor(() => {
			expect(result.current.data).toEqual({
				monthlyIncome: 10,
				monthlyExpense: 5,
				totalBalance: 5,
			});
		});

		expect(authGraphqlRequestMock).toHaveBeenCalledWith(
			'DASHBOARD_SUMMARY_QUERY',
			{ month: 2, year: 2026 },
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

		const { result } = renderHook(() => useDashboardSummary(), { wrapper });

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.data).toBeUndefined();
	});
});
