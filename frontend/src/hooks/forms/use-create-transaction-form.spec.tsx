import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CREATE_TRANSACTION_ERROR_FALLBACK } from '@/mappers/errors/graphql-error-rules';
import { useCreateTransactionForm } from './use-create-transaction-form';

const { mutateAsyncMock, toCreateTransactionInputMock } = vi.hoisted(() => ({
	mutateAsyncMock: vi.fn(),
	toCreateTransactionInputMock: vi.fn((value) => value),
}));

vi.mock('@/mappers/form-to-api/transaction.form-to-api.mapper', () => ({
	toCreateTransactionInput: toCreateTransactionInputMock,
}));

vi.mock('../mutations/use-create-transaction-mutation', () => ({
	useCreateTransactionMutation: () => ({
		mutateAsync: mutateAsyncMock,
		isPending: false,
	}),
}));

describe('useCreateTransactionForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('submits mapped payload and calls success callback', async () => {
		const onSuccess = vi.fn();
		const { result } = renderHook(() => useCreateTransactionForm(onSuccess));

		await act(async () => {
			result.current.form.setValue('description', 'Lunch');
			result.current.form.setValue('date', '2026-02-20');
			result.current.form.setValue('amount', '123,45');
			result.current.form.setValue('categoryId', 'category-1');
			result.current.form.setValue('type', 'expense');
			await result.current.onSubmit();
		});

		expect(toCreateTransactionInputMock).toHaveBeenCalled();
		expect(mutateAsyncMock).toHaveBeenCalled();
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});

	it('stores fallback message on submit error', async () => {
		mutateAsyncMock.mockRejectedValueOnce(new Error('boom'));
		const { result } = renderHook(() => useCreateTransactionForm());

		await act(async () => {
			result.current.form.setValue('description', 'Lunch');
			result.current.form.setValue('date', '2026-02-20');
			result.current.form.setValue('amount', '123,45');
			result.current.form.setValue('categoryId', 'category-1');
			result.current.form.setValue('type', 'expense');
			await result.current.onSubmit();
		});

		expect(result.current.formError).toBe(CREATE_TRANSACTION_ERROR_FALLBACK);
	});

	it('does not submit when description is empty', async () => {
		const { result } = renderHook(() => useCreateTransactionForm());

		await act(async () => {
			result.current.form.setValue('date', '2026-02-20');
			result.current.form.setValue('amount', '123,45');
			result.current.form.setValue('categoryId', 'category-1');
			result.current.form.setValue('type', 'expense');
			await result.current.onSubmit();
		});

		expect(mutateAsyncMock).not.toHaveBeenCalled();
	});
});
