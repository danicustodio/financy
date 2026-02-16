import { QueryClient } from '@tanstack/react-query';

const TEN_MINUTES = 10 * 60 * 1000;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: TEN_MINUTES,
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});
