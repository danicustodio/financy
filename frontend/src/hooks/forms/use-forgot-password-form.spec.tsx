import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AUTH_FORGOT_PASSWORD_ERROR_FALLBACK } from '@/mappers/errors/graphql-error-rules';
import { useForgotPasswordForm } from './use-forgot-password-form';

const { mutateMock } = vi.hoisted(() => ({
	mutateMock: vi.fn(),
}));

vi.mock('../mutations/use-request-password-reset-mutation', () => ({
	useRequestPasswordResetMutation: () => ({
		mutate: mutateMock,
		isPending: false,
	}),
}));

describe('useForgotPasswordForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('sets success when mutation succeeds', async () => {
		mutateMock.mockImplementation((_data, options) => options.onSuccess?.());
		const { result } = renderHook(() => useForgotPasswordForm());

		await act(async () => {
			result.current.form.setValue('email', 'user@example.com');
			await result.current.onSubmit();
		});

		expect(result.current.isSuccess).toBe(true);
	});

	it('stores fallback message on mutation error', async () => {
		mutateMock.mockImplementation((_data, options) =>
			options.onError?.(new Error('boom')),
		);
		const { result } = renderHook(() => useForgotPasswordForm());

		await act(async () => {
			result.current.form.setValue('email', 'user@example.com');
			await result.current.onSubmit();
		});

		expect(result.current.formError).toBe(AUTH_FORGOT_PASSWORD_ERROR_FALLBACK);
	});

	it('does not call mutate when email is invalid', async () => {
		const { result } = renderHook(() => useForgotPasswordForm());

		await act(async () => {
			result.current.form.setValue('email', 'not-an-email');
			await result.current.onSubmit();
		});

		expect(mutateMock).not.toHaveBeenCalled();
	});
});
