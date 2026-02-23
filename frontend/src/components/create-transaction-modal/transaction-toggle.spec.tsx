import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TransactionToggle } from './transaction-toggle.component';

describe('TransactionToggle', () => {
	it('calls onChange with selected type', async () => {
		const onChange = vi.fn();

		render(<TransactionToggle value="expense" onChange={onChange} />);
		await userEvent.click(screen.getByRole('radio', { name: /Receita/i }));

		expect(onChange).toHaveBeenCalledWith('income');
	});
});
