import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SectionCard } from './section-card.component';

describe('SectionCard', () => {
	it('renders title, link and children', () => {
		render(
			<MemoryRouter>
				<SectionCard title="Recent" linkTo="/transactions" linkLabel="View all">
					<p>Content</p>
				</SectionCard>
			</MemoryRouter>,
		);

		expect(screen.getByText('Recent')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /View all/i })).toHaveAttribute(
			'href',
			'/transactions',
		);
		expect(screen.getByText('Content')).toBeInTheDocument();
	});

	it('renders optional footer', () => {
		render(
			<MemoryRouter>
				<SectionCard
					title="Recent"
					linkTo="/transactions"
					linkLabel="View all"
					footer={<p>Footer</p>}
				>
					<p>Content</p>
				</SectionCard>
			</MemoryRouter>,
		);

		expect(screen.getByText('Footer')).toBeInTheDocument();
	});

	it('does not render footer area when footer prop is omitted', () => {
		render(
			<MemoryRouter>
				<SectionCard title="Recent" linkTo="/transactions" linkLabel="View all">
					<p>Content</p>
				</SectionCard>
			</MemoryRouter>,
		);

		expect(screen.queryByText('Footer')).not.toBeInTheDocument();
	});
});
