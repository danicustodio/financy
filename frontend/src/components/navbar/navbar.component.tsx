import { Link as RouterLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';

const navLinks = [
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/transactions', label: 'Transações' },
	{ href: '/categories', label: 'Categorias' },
];

export const Navbar = () => {
	const location = useLocation();
	const { user } = useAuthStore();

	const initials = user?.name
		? user.name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)
		: 'CT';

	return (
		<nav className="flex items-center justify-between border-financy-gray-200 border-b bg-white px-12 py-4">
			{/* Logo */}
			<div className="flex items-center gap-2">
				<img src="/logo.svg" alt="Financy" className="h-6" />
			</div>

			{/* Nav Links - Centered */}
			<div className="flex items-center gap-5">
				{navLinks.map((link) => {
					const isActive = location.pathname === link.href;
					return (
						<RouterLink
							key={link.href}
							to={link.href}
							className={cn(
								'text-sm transition-colors',
								isActive
									? 'font-semibold text-financy-brand-base'
									: 'font-normal text-financy-gray-600 hover:text-financy-gray-800',
							)}
						>
							{link.label}
						</RouterLink>
					);
				})}
			</div>

			{/* User Avatar */}
			<RouterLink to="/profile" className="flex items-center gap-3">
				<div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-financy-gray-300 transition-colors hover:bg-financy-gray-400">
					<span className="font-medium text-financy-gray-800 text-sm">
						{initials}
					</span>
				</div>
			</RouterLink>
		</nav>
	);
};
