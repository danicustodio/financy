import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navbar';

export function LoggedLayout() {
	return (
		<div className="min-h-screen bg-financy-gray-100">
			<Navbar />
			<Outlet />
		</div>
	);
}
