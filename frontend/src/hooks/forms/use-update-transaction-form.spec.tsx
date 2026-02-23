import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UPDATE_TRANSACTION_ERROR_FALLBACK } from '@/mappers/errors/graphql-error-rules';
import {
	toUpdateTransactionFormDefaults,
	useUpdateTransactionForm,
} from './use-update-transaction-form';

const { mutateAsyncMock, toUpdateTransactionInputMock } = vi.hoisted(() => ({
	mutateAsyncMock: vi.fn(),
	toUpdateTransactionInputMock: vi.fn((value) => value),
}));

vi.mock('@/mappers/form-to-api/transaction.form-to-api.mapper', () => ({
	toUpdateTransactionInput: toUpdateTransactionInputMock,
}));

vi.mock('../mutations/use-update-transaction-mutation', () => ({
	useUpdateTransactionMutation: () => ({
		mutateAsync: mutateAsyncMock,
		isPending: false,
	}),
}));

const transaction = {
	id: '550e8400-e29b-41d4-a716-446655440001',
	description: 'Salary',
	amount: 4500,
	type: 'income' as const,
	date: '2026-02-22T00:00:00.000Z',
	category: {
		id: 'category-1',
		title: 'Work',
		icon: 'briefcase-business' as const,
		color: 'blue' as const,
	},
};

describe('useUpdateTransactionForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('creates default values from transaction', () => {
		const defaults = toUpdateTransactionFormDefaults(transaction);

		expect(defaults.id).toBe(transaction.id);
		expect(defaults.description).toBe(transaction.description);
		expect(defaults.date).toBe('2026-02-22');
		expect(defaults.categoryId).toBe('category-1');
		expect(defaults.type).toBe('income');
	});

	it('submits mapped payload and calls success callback', async () => {
		const onSuccess = vi.fn();
		const { result } = renderHook(() =>
			useUpdateTransactionForm(transaction, onSuccess),
		);

		await act(async () => {
			result.current.form.setValue('id', transaction.id);
			result.current.form.setValue('description', 'Salary updated');
			result.current.form.setValue('date', '2026-02-22');
			result.current.form.setValue('amount', '4500,00');
			result.current.form.setValue('categoryId', 'category-1');
			result.current.form.setValue('type', 'income');
			await result.current.onSubmit();
		});

		expect(toUpdateTransactionInputMock).toHaveBeenCalled();
		expect(mutateAsyncMock).toHaveBeenCalled();
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});

	it('stores fallback message on submit error', async () => {
		mutateAsyncMock.mockRejectedValueOnce(new Error('boom'));
		const { result } = renderHook(() => useUpdateTransactionForm(transaction));

		await act(async () => {
			result.current.form.setValue('id', transaction.id);
			result.current.form.setValue('description', 'Salary updated');
			result.current.form.setValue('date', '2026-02-22');
			result.current.form.setValue('amount', '4500,00');
			result.current.form.setValue('categoryId', 'category-1');
			result.current.form.setValue('type', 'income');
			await result.current.onSubmit();
		});

		expect(result.current.formError).toBe(UPDATE_TRANSACTION_ERROR_FALLBACK);
	});

	it('does not submit when description is empty', async () => {
		const { result } = renderHook(() => useUpdateTransactionForm(transaction));

		await act(async () => {
			result.current.form.setValue('id', transaction.id);
			result.current.form.setValue('description', '');
			result.current.form.setValue('date', '2026-02-22');
			result.current.form.setValue('amount', '4500,00');
			result.current.form.setValue('categoryId', 'category-1');
			result.current.form.setValue('type', 'income');
			await result.current.onSubmit();
		});

		expect(mutateAsyncMock).not.toHaveBeenCalled();
	});
});
