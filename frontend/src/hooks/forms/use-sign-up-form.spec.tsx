import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AUTH_SIGN_UP_ERROR_FALLBACK } from '@/mappers/errors/graphql-error-rules';
import { useSignUpForm } from './use-sign-up-form';

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

vi.mock('../mutations/use-sign-up-mutation', () => ({
	useSignUpMutation: () => ({
		mutate: mutateMock,
		isPending: false,
	}),
}));

describe('useSignUpForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('submits form data to sign up mutation', async () => {
		const { result } = renderHook(() => useSignUpForm());

		await act(async () => {
			result.current.form.setValue('name', 'John Doe');
			result.current.form.setValue('email', 'user@example.com');
			result.current.form.setValue('password', 'password-123');
			await result.current.onSubmit();
		});

		expect(mutateMock).toHaveBeenCalledWith(
			{
				name: 'John Doe',
				email: 'user@example.com',
				password: 'password-123',
			},
			expect.any(Object),
		);
	});

	it('navigates to dashboard on success', async () => {
		mutateMock.mockImplementation(
			(
				_: unknown,
				options: { onSuccess?: () => void; onError?: (error: unknown) => void },
			) => {
				options.onSuccess?.();
			},
		);

		const { result } = renderHook(() => useSignUpForm());

		await act(async () => {
			result.current.form.setValue('name', 'John Doe');
			result.current.form.setValue('email', 'user@example.com');
			result.current.form.setValue('password', 'password-123');
			await result.current.onSubmit();
		});

		expect(navigateMock).toHaveBeenCalledWith('/dashboard');
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

		const { result } = renderHook(() => useSignUpForm());

		await act(async () => {
			result.current.form.setValue('name', 'John Doe');
			result.current.form.setValue('email', 'user@example.com');
			result.current.form.setValue('password', 'password-123');
			await result.current.onSubmit();
		});

		expect(result.current.formError).toBe(AUTH_SIGN_UP_ERROR_FALLBACK);
	});

	it('does not call mutate when name is too short', async () => {
		const { result } = renderHook(() => useSignUpForm());

		await act(async () => {
			result.current.form.setValue('name', 'A');
			result.current.form.setValue('email', 'user@example.com');
			result.current.form.setValue('password', 'password-123');
			await result.current.onSubmit();
		});

		expect(mutateMock).not.toHaveBeenCalled();
	});
});
