import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import type { AuthUser } from '@/stores/authStore';
import { Navbar } from './navbar.component';

const { useLocationMock, useAuthStoreMock } = vi.hoisted(() => ({
	useLocationMock: vi.fn(() => ({ pathname: '/dashboard' })),
	useAuthStoreMock: vi.fn<() => { user: AuthUser | null }>(() => ({
		user: null,
	})),
}));

vi.mock('react-router-dom', async (importOriginal) => {
	const actual = await importOriginal<typeof import('react-router-dom')>();
	return {
		...actual,
		useLocation: () => useLocationMock(),
	};
});

vi.mock('@/stores/authStore', () => ({
	useAuthStore: () => useAuthStoreMock(),
}));

describe('Navbar', () => {
	it('shows active link and user initials', () => {
		useLocationMock.mockReturnValue({ pathname: '/categories' });
		useAuthStoreMock.mockReturnValue({
			user: { id: 'user-1', email: 'u@example.com', name: 'John Doe' },
		});

		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>,
		);

		expect(screen.getByRole('link', { name: 'Categorias' })).toHaveClass(
			'font-semibold',
		);
		expect(screen.getByText('JD')).toBeInTheDocument();
	});

	it('falls back to CT initials when there is no user', () => {
		useAuthStoreMock.mockReturnValue({ user: null });

		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>,
		);

		expect(screen.getByText('CT')).toBeInTheDocument();
	});
});
