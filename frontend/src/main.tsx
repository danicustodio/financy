import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router';

const TEN_MINUTES = 10 * 60 * 1000;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: TEN_MINUTES,
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

const root = document.getElementById('root');

if (root) {
	createRoot(root).render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>,
	);
}
