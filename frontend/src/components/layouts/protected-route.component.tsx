import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export function ProtectedRoute() {
	const token = useAuthStore((state) => state.token);

	if (!token) {
		return <Navigate to="/signin" replace />;
	}

	return <Outlet />;
}
