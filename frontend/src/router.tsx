import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoggedLayout, ProtectedRoute } from '@/components/layouts';
import { SignIn } from '@/pages/authentication/sign-in.page';
import { SignUp } from '@/pages/authentication/sign-up.page';
import { Dashboard } from '@/pages/dashboard/dashboard.page';
import { Transactions } from '@/pages/transactions/transactions.page';
import { Categories } from './pages/categories/categories.page';
import { Profile } from './pages/profile/profile.page';

export const router = createBrowserRouter([
	{
		path: '/signin',
		element: <SignIn />,
	},
	{
		path: '/signup',
		element: <SignUp />,
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
				element: <LoggedLayout />,
				children: [
					{
						index: true,
						element: <Navigate to="/dashboard" replace />,
					},
					{
						path: 'dashboard',
						element: <Dashboard />,
					},
					{
						path: 'transactions',
						element: <Transactions />,
					},
					{
						path: 'categories',
						element: <Categories />,
					},
					{
						path: 'profile',
						element: <Profile />,
					},
				],
			},
		],
	},
]);
