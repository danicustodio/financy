import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProtectedRoute } from './protected-route.component';

const { useAuthStoreMock } = vi.hoisted(() => ({
	useAuthStoreMock: vi.fn(),
}));

vi.mock('@/stores/authStore', () => ({
	useAuthStore: (
		selector: (state: { token: string | null }) => string | null,
	) => useAuthStoreMock(selector),
}));

describe('ProtectedRoute', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('redirects to sign in when user has no token', () => {
		useAuthStoreMock.mockImplementation(
			(selector: (state: { token: string | null }) => string | null) =>
				selector({ token: null }),
		);

		render(
			<MemoryRouter initialEntries={['/private']}>
				<Routes>
					<Route path="/signin" element={<p>Sign in page</p>} />
					<Route path="/private" element={<ProtectedRoute />}>
						<Route index element={<p>Private content</p>} />
					</Route>
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.getByText('Sign in page')).toBeInTheDocument();
		expect(screen.queryByText('Private content')).not.toBeInTheDocument();
	});

	it('renders nested route when token exists', () => {
		useAuthStoreMock.mockImplementation(
			(selector: (state: { token: string | null }) => string | null) =>
				selector({ token: 'token-123' }),
		);

		render(
			<MemoryRouter initialEntries={['/private']}>
				<Routes>
					<Route path="/signin" element={<p>Sign in page</p>} />
					<Route path="/private" element={<ProtectedRoute />}>
						<Route index element={<p>Private content</p>} />
					</Route>
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.getByText('Private content')).toBeInTheDocument();
		expect(screen.queryByText('Sign in page')).not.toBeInTheDocument();
	});
});
