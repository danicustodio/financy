import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { IconButton } from './icon-button.component';

describe('IconButton', () => {
	it('renders icon and handles click', async () => {
		const onClick = vi.fn();
		render(
			<IconButton icon={<span data-testid="icon">i</span>} onClick={onClick} />,
		);

		expect(screen.getByTestId('icon')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button'));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('respects disabled state', async () => {
		const onClick = vi.fn();
		render(
			<IconButton
				icon={<span data-testid="icon">i</span>}
				onClick={onClick}
				disabled
			/>,
		);

		const button = screen.getByRole('button');
		await userEvent.click(button);
		expect(button).toBeDisabled();
		expect(onClick).not.toHaveBeenCalled();
	});

	it('forwards aria-label to the button element', () => {
		render(
			<IconButton
				icon={<span>i</span>}
				aria-label="Delete item"
				onClick={vi.fn()}
			/>,
		);

		expect(
			screen.getByRole('button', { name: 'Delete item' }),
		).toBeInTheDocument();
	});
});
