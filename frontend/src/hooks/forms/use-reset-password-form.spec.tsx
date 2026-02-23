import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AUTH_RESET_PASSWORD_ERROR_FALLBACK } from '@/mappers/errors/graphql-error-rules';
import { useResetPasswordForm } from './use-reset-password-form';

const { navigateMock, mutateMock } = vi.hoisted(() => ({
	navigateMock: vi.fn(),
	mutateMock: vi.fn(),
}));

vi.mock('react-router-dom', async (importOriginal) => {
	const actual = await importOriginal<typeof import('react-router-dom')>();
	return {
		...actual,
		useNavigate: () => navigateMock,
	};
});

vi.mock('../mutations/use-reset-password-mutation', () => ({
	useResetPasswordMutation: () => ({
		mutate: mutateMock,
		isPending: false,
	}),
}));

describe('useResetPasswordForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('does not submit and shows error when token is missing', async () => {
		const { result } = renderHook(() => useResetPasswordForm(null));

		await act(async () => {
			result.current.form.setValue('password', 'password-123');
			result.current.form.setValue('confirmPassword', 'password-123');
			await result.current.onSubmit();
		});

		expect(mutateMock).not.toHaveBeenCalled();
		expect(result.current.formError).toBe(
			'Token de recuperação não foi informado.',
		);
	});

	it('submits with token and redirects on success', async () => {
		mutateMock.mockImplementation(
			(
				_: unknown,
				options: { onSuccess?: () => void; onError?: (error: unknown) => void },
			) => {
				options.onSuccess?.();
			},
		);

		const { result } = renderHook(() => useResetPasswordForm('token-123'));

		await act(async () => {
			result.current.form.setValue('password', 'password-123');
			result.current.form.setValue('confirmPassword', 'password-123');
			await result.current.onSubmit();
		});

		expect(mutateMock).toHaveBeenCalledWith(
			{
				token: 'token-123',
				password: 'password-123',
			},
			expect.any(Object),
		);
		expect(navigateMock).toHaveBeenCalledWith('/signin?reset=success');
	});

	it('stores fallback message on mutation error', async () => {
		mutateMock.mockImplementation(
			(
				_: unknown,
				options: { onSuccess?: () => void; onError?: (error: unknown) => void },
			) => {
				options.onError?.(new Error('boom'));
			},
		);

		const { result } = renderHook(() => useResetPasswordForm('token-123'));

		await act(async () => {
			result.current.form.setValue('password', 'password-123');
			result.current.form.setValue('confirmPassword', 'password-123');
			await result.current.onSubmit();
		});

		expect(result.current.formError).toBe(AUTH_RESET_PASSWORD_ERROR_FALLBACK);
	});

	it('does not call mutate when passwords do not match', async () => {
		const { result } = renderHook(() => useResetPasswordForm('token-123'));

		await act(async () => {
			result.current.form.setValue('password', 'password-123');
			result.current.form.setValue('confirmPassword', 'different-password');
			await result.current.onSubmit();
		});

		expect(mutateMock).not.toHaveBeenCalled();
	});
});
