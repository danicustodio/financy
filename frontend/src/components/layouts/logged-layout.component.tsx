import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/components/error-boundary';
import { Navbar } from '@/components/navbar';

export function LoggedLayout() {
	return (
		<div className="min-h-screen bg-financy-gray-100">
			<Navbar />
			<ErrorBoundary scope="layout">
				<Outlet />
			</ErrorBoundary>
		</div>
	);
}
