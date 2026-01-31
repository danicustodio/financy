import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LabelButton } from './label-button.component';

const TestIcon = () => <span data-testid="test-icon">★</span>;

describe('LabelButton', () => {
	describe('rendering', () => {
		it('renders children text', () => {
			render(<LabelButton>Click me</LabelButton>);
			expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
		});

		it('renders with icon and children', () => {
			render(<LabelButton icon={<TestIcon />}>Submit</LabelButton>);
			expect(screen.getByRole('button', { name: /Submit/ })).toBeInTheDocument();
			expect(screen.getByTestId('test-icon')).toBeInTheDocument();
		});

		it('does not render icon wrapper when icon is not provided', () => {
			const { container } = render(<LabelButton>No icon</LabelButton>);
			const iconWrapper = container.querySelector('span');
			expect(iconWrapper).not.toBeInTheDocument();
		});
	});

	describe('variants', () => {
		it('renders with default variant by default', () => {
			render(<LabelButton>Default</LabelButton>);
			const button = screen.getByRole('button', { name: 'Default' });
			expect(button).toHaveClass('bg-financy-brand-base');
			expect(button).toHaveClass('text-financy-white');
		});

		it('renders with outline variant', () => {
			render(<LabelButton variant="outline">Outline</LabelButton>);
			const button = screen.getByRole('button', { name: 'Outline' });
			expect(button).toHaveClass('bg-transparent');
			expect(button).toHaveClass('border');
			expect(button).toHaveClass('border-financy-gray-300');
		});

		it('applies default icon variant styles', () => {
			render(<LabelButton icon={<TestIcon />}>Default</LabelButton>);
			const iconWrapper = screen.getByTestId('test-icon').parentElement;
			expect(iconWrapper).toHaveClass('text-financy-gray-100');
		});

		it('applies outline icon variant styles', () => {
			render(
				<LabelButton icon={<TestIcon />} variant="outline">
					Outline
				</LabelButton>,
			);
			const iconWrapper = screen.getByTestId('test-icon').parentElement;
			expect(iconWrapper).toHaveClass('text-financy-gray-700');
		});
	});

	describe('sizes', () => {
		it('renders with medium size by default', () => {
			render(<LabelButton>Medium</LabelButton>);
			const button = screen.getByRole('button', { name: 'Medium' });
			expect(button).toHaveClass('px-4', 'py-3', 'text-base');
		});

		it('renders with small size', () => {
			render(<LabelButton size="sm">Small</LabelButton>);
			const button = screen.getByRole('button', { name: 'Small' });
			expect(button).toHaveClass('px-3', 'py-2', 'text-sm');
		});

		it('applies medium icon size by default', () => {
			render(<LabelButton icon={<TestIcon />}>Medium</LabelButton>);
			const iconWrapper = screen.getByTestId('test-icon').parentElement;
			expect(iconWrapper).toHaveClass('w-4.5', 'h-4.5');
		});

		it('applies small icon size', () => {
			render(
				<LabelButton icon={<TestIcon />} size="sm">
					Small
				</LabelButton>,
			);
			const iconWrapper = screen.getByTestId('test-icon').parentElement;
			expect(iconWrapper).toHaveClass('w-4', 'h-4');
		});
	});

	describe('disabled state', () => {
		it('renders in disabled state', () => {
			render(<LabelButton disabled>Disabled</LabelButton>);
			const button = screen.getByRole('button', { name: 'Disabled' });
			expect(button).toBeDisabled();
		});

		it('applies disabled styles', () => {
			render(<LabelButton disabled>Disabled</LabelButton>);
			const button = screen.getByRole('button', { name: 'Disabled' });
			expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
		});
	});

	describe('interactions', () => {
		it('calls onClick handler when clicked', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();

			render(<LabelButton onClick={handleClick}>Click me</LabelButton>);
			await user.click(screen.getByRole('button', { name: 'Click me' }));

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('does not call onClick when disabled', async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();

			render(
				<LabelButton onClick={handleClick} disabled>
					Disabled
				</LabelButton>,
			);
			await user.click(screen.getByRole('button', { name: 'Disabled' }));

			expect(handleClick).not.toHaveBeenCalled();
		});
	});
});
