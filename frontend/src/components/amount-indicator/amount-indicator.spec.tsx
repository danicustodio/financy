import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AmountIndicator } from './amount-indicator.component';

describe('AmountIndicator', () => {
	it('renders income with plus sign', () => {
		render(<AmountIndicator amount={1234.56} type="income" />);

		expect(screen.getByText(/\+/)).toBeInTheDocument();
	});

	it('renders expense with minus sign', () => {
		render(<AmountIndicator amount={1234.56} type="expense" />);

		expect(screen.getByText(/-/)).toBeInTheDocument();
	});

	it('does not render icon when showIcon is false', () => {
		const { container } = render(
			<AmountIndicator amount={1234.56} type="expense" showIcon={false} />,
		);

		expect(container.querySelector('svg')).toBeNull();
	});
});
