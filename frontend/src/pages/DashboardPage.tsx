import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export function DashboardPage() {
	const navigate = useNavigate();
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<div className="min-h-screen bg-gray-900 p-8">
			<div className="max-w-4xl mx-auto">
				<header className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-2xl font-bold text-white">Dashboard</h1>
						<p className="text-gray-400">
							Welcome back, {user?.name ?? 'User'}
						</p>
					</div>

					<button
						type="button"
						onClick={handleLogout}
						className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
					>
						Logout
					</button>
				</header>

				<main className="bg-gray-800 rounded-xl p-6">
					<p className="text-gray-300">
						Your dashboard content will go here. Figma design coming soon.
					</p>
				</main>
			</div>
		</div>
	);
}
