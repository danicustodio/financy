import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UPDATE_ME_ERROR_FALLBACK } from '@/mappers/errors/graphql-error-rules';
import { useProfileForm } from './use-profile-form';

const { mutateAsyncMock } = vi.hoisted(() => ({
	mutateAsyncMock: vi.fn(),
}));

vi.mock('../mutations/use-update-me-mutation', () => ({
	useUpdateMeMutation: () => ({
		mutateAsync: mutateAsyncMock,
		isPending: false,
	}),
}));

describe('useProfileForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('does not mutate when profile is missing', async () => {
		const { result } = renderHook(() => useProfileForm(undefined));

		await act(async () => {
			result.current.form.setValue('name', 'John Doe');
			await result.current.onSubmit();
		});

		expect(mutateAsyncMock).not.toHaveBeenCalled();
	});

	it('does not mutate when trimmed name did not change', async () => {
		const profile = {
			id: 'user-1',
			email: 'user@example.com',
			name: 'John Doe',
		};
		const { result } = renderHook(() => useProfileForm(profile));

		await act(async () => {
			result.current.form.setValue('name', '   John Doe   ');
			await result.current.onSubmit();
		});

		expect(mutateAsyncMock).not.toHaveBeenCalled();
	});

	it('mutates with trimmed name when value changed', async () => {
		const profile = {
			id: 'user-1',
			email: 'user@example.com',
			name: 'John Doe',
		};
		const { result } = renderHook(() => useProfileForm(profile));

		await act(async () => {
			result.current.form.setValue('name', '  Jane Doe  ');
			await result.current.onSubmit();
		});

		expect(mutateAsyncMock).toHaveBeenCalledWith({ name: 'Jane Doe' });
	});

	it('stores fallback message on update error', async () => {
		mutateAsyncMock.mockRejectedValueOnce(new Error('boom'));
		const profile = {
			id: 'user-1',
			email: 'user@example.com',
			name: 'John Doe',
		};
		const { result } = renderHook(() => useProfileForm(profile));

		await act(async () => {
			result.current.form.setValue('name', 'Jane Doe');
			await result.current.onSubmit();
		});

		expect(result.current.formError).toBe(UPDATE_ME_ERROR_FALLBACK);
	});

	it('does not mutate when name is too short', async () => {
		const profile = {
			id: 'user-1',
			email: 'user@example.com',
			name: 'John Doe',
		};
		const { result } = renderHook(() => useProfileForm(profile));

		await act(async () => {
			result.current.form.setValue('name', 'X');
			await result.current.onSubmit();
		});

		expect(mutateAsyncMock).not.toHaveBeenCalled();
	});
});
