import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '@/components/error-boundary';
import { queryClient } from '@/lib/query-client';
import './index.css';
import { router } from './router';

const root = document.getElementById('root');

if (root) {
	createRoot(root).render(
		<StrictMode>
			<ErrorBoundary scope="app">
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</ErrorBoundary>
		</StrictMode>,
	);
}
