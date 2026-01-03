import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Input } from '@/components/ui/input';

describe('Input', () => {
	it('renders with label', () => {
		render(<Input label="Email" placeholder="Enter your email" />);
		expect(screen.getByText('Email')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
	});

	it('renders with helper text', () => {
		render(<Input label="Email" helper="We'll never share your email" />);
		expect(
			screen.getByText("We'll never share your email"),
		).toBeInTheDocument();
	});

	it('renders error state', () => {
		render(<Input label="Email" error="Invalid email address" />);
		expect(screen.getByText('Invalid email address')).toBeInTheDocument();
	});

	it('renders disabled state', () => {
		render(<Input label="Email" disabled placeholder="Disabled input" />);
		expect(screen.getByPlaceholderText('Disabled input')).toBeDisabled();
	});

	it('renders with prefix icon', () => {
		render(
			<Input
				label="Email"
				prefix={<span data-testid="prefix-icon">📧</span>}
			/>,
		);
		expect(screen.getByTestId('prefix-icon')).toBeInTheDocument();
	});

	it('renders with suffix icon', () => {
		render(
			<Input
				label="Password"
				suffix={<span data-testid="suffix-icon">👁</span>}
			/>,
		);
		expect(screen.getByTestId('suffix-icon')).toBeInTheDocument();
	});

	it('allows user input', async () => {
		const user = userEvent.setup();
		render(<Input label="Name" placeholder="Enter name" />);
		const input = screen.getByPlaceholderText('Enter name');
		await user.type(input, 'John Doe');
		expect(input).toHaveValue('John Doe');
	});

	it('associates label with input via id', () => {
		render(<Input id="email-input" label="Email" />);
		const label = screen.getByText('Email');
		expect(label).toHaveAttribute('for', 'email-input');
	});

	it('error takes precedence over helper text display', () => {
		render(<Input label="Email" helper="Helper text" error="Error message" />);
		expect(screen.getByText('Error message')).toBeInTheDocument();
		expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
	});
});
