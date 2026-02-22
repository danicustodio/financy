import { describe, expect, it, vi } from 'vitest';
import { errorCodes } from '../../shared/errors/error-codes';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	it('returns token and user on successful login', async () => {
		const authRepository = {
			findUserByEmail: vi.fn().mockResolvedValue({
				id: 'user-1',
				email: 'john@example.com',
				name: 'John',
				passwordHash: await import('bcryptjs').then(({ default: bcrypt }) =>
					bcrypt.hash('password123', 12),
				),
			}),
			createUser: vi.fn(),
		};

		const authService = new AuthService(
			authRepository as never,
			() => 'token-123',
		);

		const result = await authService.login({
			email: 'john@example.com',
			password: 'password123',
		});

		expect(result.token).toBe('token-123');
		expect(result.user.id).toBe('user-1');
	});

	it('throws INVALID_CREDENTIALS for unknown email', async () => {
		const authRepository = {
			findUserByEmail: vi.fn().mockResolvedValue(null),
			createUser: vi.fn(),
		};

		const authService = new AuthService(
			authRepository as never,
			() => 'token-123',
		);

		await expect(
			authService.login({
				email: 'missing@example.com',
				password: 'password123',
			}),
		).rejects.toMatchObject({
			code: errorCodes.INVALID_CREDENTIALS,
		});
	});

	it('requestPasswordReset returns null for unknown email', async () => {
		const authRepository = {
			findUserByEmail: vi.fn().mockResolvedValue(null),
		};

		const authService = new AuthService(
			authRepository as never,
			() => 'token-123',
		);

		await expect(
			authService.requestPasswordReset({ email: 'missing@example.com' }),
		).resolves.toBeNull();
	});

	it('resetPassword throws INVALID_RESET_TOKEN for invalid token', async () => {
		const authRepository = {
			findValidPasswordResetToken: vi.fn().mockResolvedValue(null),
		};

		const authService = new AuthService(
			authRepository as never,
			() => 'token-123',
		);

		await expect(
			authService.resetPassword({
				token: 'invalid-token',
				password: 'new-password-123',
			}),
		).rejects.toMatchObject({
			code: errorCodes.INVALID_RESET_TOKEN,
		});
	});
});
