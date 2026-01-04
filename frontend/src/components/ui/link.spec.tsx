import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Link } from './link';

describe('Link', () => {
	it('renders with default variant and size', () => {
		render(<Link href="/test">Click me</Link>);
		const link = screen.getByRole('link', { name: 'Click me' });
		expect(link).toBeInTheDocument();
		expect(link).toHaveClass('text-financy-green-500');
		expect(link).toHaveClass('text-base');
	});

	it('renders with muted variant', () => {
		render(
			<Link href="/test" variant="muted">
				Muted link
			</Link>,
		);
		const link = screen.getByRole('link', { name: 'Muted link' });
		expect(link).toHaveClass('text-financy-gray-400');
	});

	it('renders with small size', () => {
		render(
			<Link href="/test" size="sm">
				Small link
			</Link>,
		);
		const link = screen.getByRole('link', { name: 'Small link' });
		expect(link).toHaveClass('text-sm');
	});

	it('renders with large size', () => {
		render(
			<Link href="/test" size="lg">
				Large link
			</Link>,
		);
		const link = screen.getByRole('link', { name: 'Large link' });
		expect(link).toHaveClass('text-lg');
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
