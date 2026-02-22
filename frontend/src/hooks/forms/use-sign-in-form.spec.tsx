import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSignInForm } from './use-sign-in-form';

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

vi.mock('../mutations/use-login-mutation', () => ({
	useLoginMutation: () => ({
		mutate: mutateMock,
		isPending: false,
	}),
}));

describe('useSignInForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('defaults rememberMe to false and submits it with credentials', async () => {
		const { result } = renderHook(() => useSignInForm());

		expect(result.current.form.getValues('rememberMe')).toBe(false);

		await act(async () => {
			result.current.form.setValue('email', 'user@example.com');
			result.current.form.setValue('password', 'password-123');
			await result.current.onSubmit();
		});

		expect(mutateMock).toHaveBeenCalledWith(
			{
				email: 'user@example.com',
				password: 'password-123',
				rememberMe: false,
			},
			expect.any(Object),
		);
	});
});
