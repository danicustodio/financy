import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Link } from './link.component';

describe('Link', () => {
	it('renders children and href', () => {
		render(<Link href="/dashboard">Dashboard</Link>);
		const link = screen.getByRole('link', { name: 'Dashboard' });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/dashboard');
	});

	it('applies base styling classes', () => {
		render(<Link href="/">Home</Link>);
		const link = screen.getByRole('link', { name: 'Home' });
		expect(link).toHaveClass(
			'inline-flex',
			'font-medium',
			'text-sm',
			'text-financy-brand-base',
		);
	});

	it('merges custom className with base styles', () => {
		render(
			<Link href="/" className="mt-4">
				Custom
			</Link>,
		);
		const link = screen.getByRole('link', { name: 'Custom' });
		expect(link).toHaveClass('mt-4');
		expect(link).toHaveClass('text-financy-brand-base');
	});

	it('forwards anchor attributes', () => {
		render(
			<Link
				href="https://example.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				External
			</Link>,
		);
		const link = screen.getByRole('link', { name: 'External' });
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('supports aria-label for accessibility', () => {
		render(
			<Link href="/settings" aria-label="Go to settings">
				⚙️
			</Link>,
		);
		expect(
			screen.getByRole('link', { name: 'Go to settings' }),
		).toBeInTheDocument();
	});
});
