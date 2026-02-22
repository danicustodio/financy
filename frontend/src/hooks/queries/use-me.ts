import { useQuery } from '@tanstack/react-query';
import { ME_QUERY } from '@/graphql';
import { authGraphqlRequest } from '@/graphql/graphql-client';
import type { MeResponse } from '@/types/api/operations';

export const ME_QUERY_KEY = ['me'] as const;

export function useMe() {
	return useQuery({
		queryKey: ME_QUERY_KEY,
		queryFn: authGraphqlRequest<MeResponse, never>(ME_QUERY),
		select: (data) => data.me,
	});
}
