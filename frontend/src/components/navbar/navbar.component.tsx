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
		<nav className="flex items-center justify-between bg-white border-b border-financy-gray-200 px-12 py-4">
			{/* Logo */}
			<div className="flex items-center gap-2">
				<svg
					width="100"
					height="24"
					viewBox="0 0 134 28"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-label="Financy"
				>
					<title>Financy</title>
					<path
						d="M0 0H14.04V4.68H5.4V10.8H12.24V15.48H5.4V24H0V0Z"
						fill="#1F6F43"
					/>
					<path d="M18.24 0H23.64V24H18.24V0Z" fill="#1F6F43" />
					<path
						d="M28.92 0H35.16L42.36 15.12H42.48L42.36 11.64V0H47.76V24H41.52L34.32 8.88H34.2L34.32 12.36V24H28.92V0Z"
						fill="#1F6F43"
					/>
					<path
						d="M56.04 0H62.16L69.48 24H63.84L62.64 19.44H55.32L54.12 24H48.72L56.04 0ZM61.56 15.24L59.04 5.64H58.92L56.4 15.24H61.56Z"
						fill="#1F6F43"
					/>
					<path
						d="M72.36 0H78.48L85.8 24H80.16L78.96 19.44H71.64L70.44 24H65.04L72.36 0ZM77.88 15.24L75.36 5.64H75.24L72.72 15.24H77.88Z"
						fill="#111827"
					/>
					<path
						d="M88.68 0H94.8L102.12 24H96.48L95.28 19.44H87.96L86.76 24H81.36L88.68 0ZM94.2 15.24L91.68 5.64H91.56L89.04 15.24H94.2Z"
						fill="#111827"
					/>
					<path
						d="M105 0H110.4V8.4H110.52L116.64 0H123L114.6 11.04L123.48 24H116.88L110.52 14.04H110.4V24H105V0Z"
						fill="#111827"
					/>
					<path
						d="M126.6 0H132L127.92 10.2L134 24H128.24L124.08 15.24L122.4 18.72V24H117V0H122.4V10.8H122.52L126.6 0Z"
						fill="#111827"
					/>
				</svg>
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
			<div className="flex items-center gap-3">
				<div className="flex items-center justify-center w-9 h-9 rounded-full bg-financy-gray-300">
					<span className="text-sm font-medium text-financy-gray-800">
						{initials}
					</span>
				</div>
			</div>
		</nav>
	);
};
