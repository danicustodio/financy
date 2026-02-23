import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CREATE_CATEGORY_ERROR_FALLBACK } from '@/mappers/errors/graphql-error-rules';
import { useCreateCategoryForm } from './use-create-category-form';

const { mutateAsyncMock, toCreateCategoryInputMock } = vi.hoisted(() => ({
	mutateAsyncMock: vi.fn(),
	toCreateCategoryInputMock: vi.fn((value) => value),
}));

vi.mock('@/mappers/form-to-api/category.form-to-api.mapper', () => ({
	toCreateCategoryInput: toCreateCategoryInputMock,
}));

vi.mock('../mutations/use-create-category-mutation', () => ({
	useCreateCategoryMutation: () => ({
		mutateAsync: mutateAsyncMock,
		isPending: false,
	}),
}));

describe('useCreateCategoryForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('submits mapped payload and calls success callback', async () => {
		const onSuccess = vi.fn();
		const { result } = renderHook(() => useCreateCategoryForm(onSuccess));

		await act(async () => {
			result.current.form.setValue('title', 'Food');
			result.current.form.setValue('description', 'Meals');
			result.current.form.setValue('icon', 'utensils');
			result.current.form.setValue('color', 'green');
			await result.current.onSubmit();
		});

		expect(toCreateCategoryInputMock).toHaveBeenCalled();
		expect(mutateAsyncMock).toHaveBeenCalled();
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});

	it('stores fallback message on submit error', async () => {
		mutateAsyncMock.mockRejectedValueOnce(new Error('boom'));
		const { result } = renderHook(() => useCreateCategoryForm());

		await act(async () => {
			result.current.form.setValue('title', 'Food');
			result.current.form.setValue('description', 'Meals');
			result.current.form.setValue('icon', 'utensils');
			result.current.form.setValue('color', 'green');
			await result.current.onSubmit();
		});

		expect(result.current.formError).toBe(CREATE_CATEGORY_ERROR_FALLBACK);
	});

	it('does not submit when title is empty', async () => {
		const { result } = renderHook(() => useCreateCategoryForm());

		await act(async () => {
			result.current.form.setValue('icon', 'utensils');
			result.current.form.setValue('color', 'green');
			await result.current.onSubmit();
		});

		expect(mutateAsyncMock).not.toHaveBeenCalled();
	});
});
