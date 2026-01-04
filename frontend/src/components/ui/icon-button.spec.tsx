import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IconButton } from './icon-button';

const TestIcon = () => <span data-testid="test-icon">✕</span>;

describe('IconButton', () => {
	it('renders with default variant and size', () => {
		render(<IconButton icon={<TestIcon />} aria-label="Close" />);
		const button = screen.getByRole('button', { name: 'Close' });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('border-financy-gray-200');
		expect(button).toHaveClass('h-10', 'w-10');
	});

	it('renders with danger variant', () => {
		render(
			<IconButton icon={<TestIcon />} aria-label="Delete" variant="danger" />,
		);
		const button = screen.getByRole('button', { name: 'Delete' });
		expect(button).toHaveClass('border-financy-red-300');
		expect(button).toHaveClass('text-financy-red-300');
	});

	it('renders with small size', () => {
		render(<IconButton icon={<TestIcon />} aria-label="Close" size="sm" />);
		const button = screen.getByRole('button', { name: 'Close' });
		expect(button).toHaveClass('h-8', 'w-8');
	});

	it('renders the icon', () => {
		render(<IconButton icon={<TestIcon />} aria-label="Close" />);
		expect(screen.getByTestId('test-icon')).toBeInTheDocument();
	});

	it('renders in disabled state', () => {
		render(<IconButton icon={<TestIcon />} aria-label="Close" disabled />);
		const button = screen.getByRole('button', { name: 'Close' });
		expect(button).toBeDisabled();
		expect(button).toHaveClass('disabled:opacity-50');
	});

	it('applies custom className', () => {
		render(
			<IconButton
				icon={<TestIcon />}
				aria-label="Close"
				className="custom-class"
			/>,
		);
		const button = screen.getByRole('button', { name: 'Close' });
		expect(button).toHaveClass('custom-class');
	});
});
