import { useQuery } from '@tanstack/react-query';
import { DASHBOARD_SUMMARY_QUERY } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import type {
	DashboardSummaryResponse,
	DashboardSummaryVariables,
} from '@/types/api/operations';

export const DASHBOARD_SUMMARY_QUERY_KEY = ['dashboardSummary'] as const;

export function useDashboardSummary() {
	const now = new Date();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();

	return useQuery({
		queryKey: [...DASHBOARD_SUMMARY_QUERY_KEY, { month, year }],
		queryFn: authGraphqlRequest<
			DashboardSummaryResponse,
			DashboardSummaryVariables
		>(DASHBOARD_SUMMARY_QUERY, { month, year }),
		select: (data) => data.dashboardSummary,
	});
}
