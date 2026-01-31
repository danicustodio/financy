import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Input } from './input.component';

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
		render(<Input label="Email" error helper="Invalid email address" />);
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
});
