import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { CategoriesSelection } from './categories-selection.component';

vi.mock('../ui/dropdown-menu', () => ({
	DropdownMenu: ({ children }: { children: ReactNode }) => (
		<div>{children}</div>
	),
	DropdownMenuTrigger: ({ children }: { children: ReactNode }) => (
		<div>{children}</div>
	),
	DropdownMenuContent: ({ children }: { children: ReactNode }) => (
		<div>{children}</div>
	),
	DropdownMenuItem: ({
		children,
		onSelect,
		disabled,
	}: {
		children: ReactNode;
		onSelect?: () => void;
		disabled?: boolean;
	}) => (
		<button type="button" onClick={onSelect} disabled={disabled}>
			{children}
		</button>
	),
}));

describe('CategoriesSelection', () => {
	it('renders selected category and calls onSelect', async () => {
		const onSelect = vi.fn();
		render(
			<CategoriesSelection
				categories={[
					{ id: 'c1', title: 'Food' },
					{ id: 'c2', title: 'Rent' },
				]}
				selectedCategoryId="c1"
				onSelect={onSelect}
			/>,
		);

		expect(screen.getAllByText('Food')).toHaveLength(2);
		await userEvent.click(screen.getByRole('button', { name: 'Rent' }));
		expect(onSelect).toHaveBeenCalledWith('c2');
	});

	it('shows loading and error message', () => {
		render(
			<CategoriesSelection
				categories={[]}
				isLoading
				errorMessage="Required"
				onSelect={vi.fn()}
			/>,
		);

		expect(screen.getByText('Carregando...')).toBeInTheDocument();
		expect(screen.getByText('Required')).toBeInTheDocument();
	});
});
