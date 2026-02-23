import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TypeTag } from './type-tag.component';

describe('TypeTag', () => {
	it('renders income label', () => {
		render(<TypeTag type="income" />);

		expect(screen.getByText('Entrada')).toBeInTheDocument();
	});

	it('renders expense label by default', () => {
		render(<TypeTag />);

		expect(screen.getByText('Saída')).toBeInTheDocument();
	});

	it('renders expense label when type is expense', () => {
		render(<TypeTag type="expense" />);

		expect(screen.getByText('Saída')).toBeInTheDocument();
	});
});
