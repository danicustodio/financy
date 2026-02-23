import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './pagination.component';

describe('Pagination', () => {
	it('renders result range and pages', () => {
		render(
			<Pagination
				currentPage={2}
				totalPages={5}
				totalResults={42}
				pageSize={10}
				onPageChange={vi.fn()}
			/>,
		);

		expect(screen.getByText('11 a 20 | 42 resultados')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
	});

	it('calls onPageChange for next and previous', async () => {
		const onPageChange = vi.fn();
		render(
			<Pagination
				currentPage={2}
				totalPages={5}
				totalResults={42}
				pageSize={10}
				onPageChange={onPageChange}
			/>,
		);

		await userEvent.click(
			screen.getByRole('button', { name: 'Próxima página' }),
		);
		await userEvent.click(
			screen.getByRole('button', { name: 'Página anterior' }),
		);

		expect(onPageChange).toHaveBeenCalledWith(3);
		expect(onPageChange).toHaveBeenCalledWith(1);
	});

	it('disables previous on first page and next on last page', () => {
		const { rerender } = render(
			<Pagination
				currentPage={1}
				totalPages={3}
				totalResults={30}
				pageSize={10}
				onPageChange={vi.fn()}
			/>,
		);

		expect(
			screen.getByRole('button', { name: 'Página anterior' }),
		).toBeDisabled();

		rerender(
			<Pagination
				currentPage={3}
				totalPages={3}
				totalResults={30}
				pageSize={10}
				onPageChange={vi.fn()}
			/>,
		);

		expect(
			screen.getByRole('button', { name: 'Próxima página' }),
		).toBeDisabled();
	});

	it('shows pages [1, 2, 3] when on the first page', () => {
		render(
			<Pagination
				currentPage={1}
				totalPages={5}
				totalResults={50}
				pageSize={10}
				onPageChange={vi.fn()}
			/>,
		);

		expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: '4' })).not.toBeInTheDocument();
	});

	it('shows pages [3, 4, 5] when on the last page', () => {
		render(
			<Pagination
				currentPage={5}
				totalPages={5}
				totalResults={50}
				pageSize={10}
				onPageChange={vi.fn()}
			/>,
		);

		expect(screen.queryByRole('button', { name: '2' })).not.toBeInTheDocument();
		expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
	});

	it('shows only available pages when total pages is fewer than 3', () => {
		render(
			<Pagination
				currentPage={1}
				totalPages={2}
				totalResults={15}
				pageSize={10}
				onPageChange={vi.fn()}
			/>,
		);

		expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: '3' })).not.toBeInTheDocument();
	});

	it('calls onPageChange with the correct page when a page button is clicked', async () => {
		const onPageChange = vi.fn();
		render(
			<Pagination
				currentPage={2}
				totalPages={5}
				totalResults={50}
				pageSize={10}
				onPageChange={onPageChange}
			/>,
		);

		await userEvent.click(screen.getByRole('button', { name: '3' }));
		expect(onPageChange).toHaveBeenCalledWith(3);
	});
});
