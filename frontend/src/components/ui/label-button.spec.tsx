import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LabelButton } from './label-button';

describe('LabelButton', () => {
	it('renders with default variant and size', () => {
		render(<LabelButton>Click me</LabelButton>);
		const button = screen.getByRole('button', { name: 'Click me' });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('bg-financy-green-500');
	});

	it('renders with outlined variant', () => {
		render(<LabelButton variant="outlined">Click me</LabelButton>);
		const button = screen.getByRole('button', { name: 'Click me' });
		expect(button).toHaveClass('bg-white');
		expect(button).toHaveClass('border');
	});

	it('renders with small size', () => {
		render(<LabelButton size="sm">Click me</LabelButton>);
		const button = screen.getByRole('button', { name: 'Click me' });
		expect(button).toHaveClass('h-10');
	});

	it('renders with medium size', () => {
		render(<LabelButton size="md">Click me</LabelButton>);
		const button = screen.getByRole('button', { name: 'Click me' });
		expect(button).toHaveClass('h-12');
	});

	it('renders with an icon', () => {
		render(
			<LabelButton icon={<span data-testid="test-icon">🔍</span>}>
				Search
			</LabelButton>,
		);
		const button = screen.getByRole('button', { name: /Search/ });
		expect(button).toBeInTheDocument();
		expect(screen.getByTestId('test-icon')).toBeInTheDocument();
	});

	it('renders in disabled state', () => {
		render(<LabelButton disabled>Disabled</LabelButton>);
		const button = screen.getByRole('button', { name: 'Disabled' });
		expect(button).toBeDisabled();
		expect(button).toHaveClass('disabled:opacity-50');
	});

	it('applies custom className', () => {
		render(<LabelButton className="custom-class">Click me</LabelButton>);
		const button = screen.getByRole('button', { name: 'Click me' });
		expect(button).toHaveClass('custom-class');
	});
});
