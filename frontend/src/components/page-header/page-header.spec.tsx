import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageHeader } from './page-header.component';

describe('PageHeader', () => {
	it('renders title and subtitle', () => {
		render(<PageHeader title="Transactions" subtitle="Manage all" />);

		expect(
			screen.getByRole('heading', { name: 'Transactions' }),
		).toBeInTheDocument();
		expect(screen.getByText('Manage all')).toBeInTheDocument();
	});

	it('renders optional action', () => {
		render(
			<PageHeader
				title="Transactions"
				subtitle="Manage all"
				action={<button type="button">New</button>}
			/>,
		);

		expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
	});

	it('renders without action slot when action prop is omitted', () => {
		render(<PageHeader title="Dashboard" subtitle="Overview" />);

		expect(
			screen.getByRole('heading', { name: 'Dashboard' }),
		).toBeInTheDocument();
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});
});
