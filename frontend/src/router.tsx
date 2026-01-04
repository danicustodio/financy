import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DashboardPage } from '@/pages/DashboardPage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';

export const router = createBrowserRouter([
	{
		path: '/signin',
		element: <SignInPage />,
	},
	{
		path: '/signup',
		element: <SignUpPage />,
	},
	{
		path: '/login',
		element: <Navigate to="/signin" replace />,
	},
	{
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				index: true,
				element: <Navigate to="/dashboard" replace />,
			},
			{
				path: 'dashboard',
				element: <DashboardPage />,
			},
		],
	},
]);
