import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Link } from './link';

describe('Link', () => {
	it('renders with default variant', () => {
		render(<Link href="/test">Click me</Link>);
		const link = screen.getByRole('link', { name: 'Click me' });
		expect(link).toBeInTheDocument();
		expect(link).toHaveClass('text-financy-brand-base');
	});

	it('has hover underline classes', () => {
		render(<Link href="/test">Hover me</Link>);
		const link = screen.getByRole('link', { name: 'Hover me' });
		expect(link).toHaveClass('hover:underline');
	});

	it('applies custom className', () => {
		render(
			<Link href="/test" className="custom-class">
				Custom
			</Link>,
		);
		const link = screen.getByRole('link', { name: 'Custom' });
		expect(link).toHaveClass('custom-class');
	});

	it('passes href correctly', () => {
		render(<Link href="https://example.com">External</Link>);
		const link = screen.getByRole('link', { name: 'External' });
		expect(link).toHaveAttribute('href', 'https://example.com');
	});
});
