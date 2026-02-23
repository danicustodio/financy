import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FormEvent, ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateTransactionModal } from './create-transaction-modal.component';

const { useListCategoriesMock, formMock, registerMock, onSubmitMock } =
	vi.hoisted(() => {
		const register = vi.fn(() => ({
			name: 'field',
			onBlur: vi.fn(),
			onChange: vi.fn(),
			ref: vi.fn(),
		}));
		const onSubmitMock = vi.fn((event: FormEvent) => event.preventDefault());

		return {
			useListCategoriesMock: vi.fn(() => ({
				data: [{ id: 'c1', title: 'Food' }],
				isLoading: false,
			})),
			formMock: {
				watch: vi.fn((name: string) => (name === 'type' ? 'expense' : 'c1')),
				formState: { errors: {} },
				register,
				setValue: vi.fn(),
				reset: vi.fn(),
			},
			registerMock: register,
			onSubmitMock,
		};
	});

vi.mock('@/hooks/queries/use-list-categories', () => ({
	useListCategories: () => useListCategoriesMock(),
}));

vi.mock('@/hooks/forms/use-create-transaction-form', () => ({
	useCreateTransactionForm: () => ({
		form: formMock,
		formError: null,
		isSubmitting: false,
		onSubmit: onSubmitMock,
	}),
}));

vi.mock('../ui/dialog', () => ({
	Dialog: ({ children }: { children: ReactNode }) => <div>{children}</div>,
	DialogTrigger: ({ children }: { children: ReactNode }) => (
		<div>{children}</div>
	),
	DialogContent: ({ children }: { children: ReactNode }) => (
		<div>{children}</div>
	),
	DialogTitle: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
	DialogDescription: ({ children }: { children: ReactNode }) => (
		<p>{children}</p>
	),
	DialogClose: ({ children }: { children: ReactNode }) => (
		<button type="button">{children}</button>
	),
}));

describe('CreateTransactionModal', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders dialog content and trigger child', () => {
		render(
			<CreateTransactionModal>
				<button type="button">Open</button>
			</CreateTransactionModal>,
		);

		expect(screen.getByText('Open')).toBeInTheDocument();
		expect(screen.getByText('Nova transação')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
		expect(registerMock).toHaveBeenCalled();
	});

	it('disables save when categories are loading', () => {
		useListCategoriesMock.mockReturnValueOnce({ data: [], isLoading: true });

		render(
			<CreateTransactionModal>
				<button type="button">Open</button>
			</CreateTransactionModal>,
		);

		expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
	});

	it('calls form onSubmit when save button is clicked', async () => {
		render(
			<CreateTransactionModal>
				<button type="button">Open</button>
			</CreateTransactionModal>,
		);

		await userEvent.click(screen.getByRole('button', { name: 'Salvar' }));

		expect(onSubmitMock).toHaveBeenCalled();
	});
});
