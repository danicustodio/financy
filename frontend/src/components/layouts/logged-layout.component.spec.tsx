import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LoggedLayout } from './logged-layout.component';

describe('LoggedLayout', () => {
	it('renders navbar and nested content', () => {
		render(
			<MemoryRouter initialEntries={['/dashboard']}>
				<Routes>
					<Route element={<LoggedLayout />}>
						<Route path="/dashboard" element={<p>Dashboard content</p>} />
					</Route>
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.getByAltText('Financy')).toBeInTheDocument();
		expect(screen.getByText('Dashboard content')).toBeInTheDocument();
	});
});
