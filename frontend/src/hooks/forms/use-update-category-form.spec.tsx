import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UPDATE_CATEGORY_ERROR_FALLBACK } from '@/mappers/errors/graphql-error-rules';
import { useUpdateCategoryForm } from './use-update-category-form';

const { mutateAsyncMock, toUpdateCategoryInputMock } = vi.hoisted(() => ({
	mutateAsyncMock: vi.fn(),
	toUpdateCategoryInputMock: vi.fn((value) => value),
}));

vi.mock('@/mappers/form-to-api/category.form-to-api.mapper', () => ({
	toUpdateCategoryInput: toUpdateCategoryInputMock,
}));

vi.mock('../mutations/use-update-category-mutation', () => ({
	useUpdateCategoryMutation: () => ({
		mutateAsync: mutateAsyncMock,
		isPending: false,
	}),
}));

const category = {
	id: '550e8400-e29b-41d4-a716-446655440000',
	title: 'Food',
	description: 'Meals',
	icon: 'utensils' as const,
	color: 'green' as const,
	transactionCount: 0,
};

describe('useUpdateCategoryForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('submits mapped payload and calls success callback', async () => {
		const onSuccess = vi.fn();
		const { result } = renderHook(() =>
			useUpdateCategoryForm(category, onSuccess),
		);

		await act(async () => {
			result.current.form.setValue('id', category.id);
			result.current.form.setValue('title', 'Food and Drinks');
			result.current.form.setValue('description', 'Meals and drinks');
			result.current.form.setValue('icon', 'utensils');
			result.current.form.setValue('color', 'green');
			await result.current.onSubmit();
		});

		expect(toUpdateCategoryInputMock).toHaveBeenCalled();
		expect(mutateAsyncMock).toHaveBeenCalled();
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});

	it('stores fallback message on submit error', async () => {
		mutateAsyncMock.mockRejectedValueOnce(new Error('boom'));
		const { result } = renderHook(() => useUpdateCategoryForm(category));

		await act(async () => {
			result.current.form.setValue('id', category.id);
			result.current.form.setValue('title', 'Food and Drinks');
			result.current.form.setValue('description', 'Meals and drinks');
			result.current.form.setValue('icon', 'utensils');
			result.current.form.setValue('color', 'green');
			await result.current.onSubmit();
		});

		expect(result.current.formError).toBe(UPDATE_CATEGORY_ERROR_FALLBACK);
	});

	it('does not submit when title is empty', async () => {
		const { result } = renderHook(() => useUpdateCategoryForm(category));

		await act(async () => {
			result.current.form.setValue('id', category.id);
			result.current.form.setValue('title', '');
			result.current.form.setValue('icon', 'utensils');
			result.current.form.setValue('color', 'green');
			await result.current.onSubmit();
		});

		expect(mutateAsyncMock).not.toHaveBeenCalled();
	});
});
