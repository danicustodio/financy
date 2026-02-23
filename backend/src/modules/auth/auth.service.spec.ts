import bcrypt from 'bcryptjs';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { errorCodes } from '../../shared/errors/error-codes';
import { makePrismaKnownError } from '../../test/helpers';
import { AuthService } from './auth.service';

let passwordHash: string;
beforeAll(async () => {
	passwordHash = await bcrypt.hash('password123', 12);
});

describe('AuthService', () => {
	it('returns token and user on successful login', async () => {
		const authRepository = {
			findUserByEmail: vi.fn().mockResolvedValue({
				id: 'user-1',
				email: 'john@example.com',
				name: 'John',
				passwordHash,
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

	it('throws INVALID_CREDENTIALS for wrong password', async () => {
		const authRepository = {
			findUserByEmail: vi.fn().mockResolvedValue({
				id: 'user-1',
				email: 'john@example.com',
				name: 'John',
				passwordHash,
			}),
		};

		const authService = new AuthService(
			authRepository as never,
			() => 'token-123',
		);

		await expect(
			authService.login({
				email: 'john@example.com',
				password: 'wrong-password',
			}),
		).rejects.toMatchObject({
			code: errorCodes.INVALID_CREDENTIALS,
		});
	});

	it('signUp returns token and created user on success', async () => {
		const createdUser = {
			id: 'user-1',
			name: 'John',
			email: 'john@example.com',
			passwordHash: 'ignored',
		};
		const authRepository = {
			createUser: vi.fn().mockResolvedValue(createdUser),
		};
		const jwtSign = vi.fn().mockReturnValue('token-abc');
		const authService = new AuthService(authRepository as never, jwtSign);

		const result = await authService.signUp({
			name: 'John',
			email: 'john@example.com',
			password: 'password123',
		});

		expect(result).toEqual({ token: 'token-abc', user: createdUser });
		expect(authRepository.createUser).toHaveBeenCalledWith(
			{
				name: 'John',
				email: 'john@example.com',
				password: 'password123',
			},
			expect.any(String),
		);
		expect(jwtSign).toHaveBeenCalledWith({ sub: 'user-1' });
	});

	it('signUp maps P2002 to CONFLICT', async () => {
		const authRepository = {
			createUser: vi.fn().mockRejectedValue(makePrismaKnownError('P2002')),
		};
		const authService = new AuthService(
			authRepository as never,
			() => 'token-123',
		);

		await expect(
			authService.signUp({
				name: 'John',
				email: 'john@example.com',
				password: 'password123',
			}),
		).rejects.toMatchObject({ code: errorCodes.CONFLICT });
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

	it('requestPasswordReset invalidates tokens and stores new token hash for known email', async () => {
		vi.stubEnv('NODE_ENV', 'test');
		const authRepository = {
			findUserByEmail: vi.fn().mockResolvedValue({ id: 'user-1' }),
			invalidateActiveResetTokensByUser: vi.fn().mockResolvedValue(undefined),
			createPasswordResetToken: vi.fn().mockResolvedValue(undefined),
		};
		const authService = new AuthService(
			authRepository as never,
			() => 'token-123',
		);
		const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

		const token = await authService.requestPasswordReset({
			email: 'john@example.com',
		});

		expect(typeof token).toBe('string');
		expect(token).not.toBeNull();
		expect(
			authRepository.invalidateActiveResetTokensByUser,
		).toHaveBeenCalledWith('user-1');
		expect(authRepository.createPasswordResetToken).toHaveBeenCalledWith(
			'user-1',
			expect.any(String),
			expect.any(Date),
		);
		expect(logSpy).toHaveBeenCalledWith(
			expect.stringContaining(token as string),
		);
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

	it('resetPassword returns true when token is consumed and password is updated', async () => {
		const authRepository = {
			findValidPasswordResetToken: vi.fn().mockResolvedValue({
				id: 'reset-1',
				userId: 'user-1',
			}),
			consumeResetTokenAndUpdatePassword: vi.fn().mockResolvedValue(true),
		};

		const authService = new AuthService(
			authRepository as never,
			() => 'token-123',
		);

		await expect(
			authService.resetPassword({
				token: 'valid-token',
				password: 'new-password-123',
			}),
		).resolves.toBe(true);
		expect(
			authRepository.consumeResetTokenAndUpdatePassword,
		).toHaveBeenCalledWith('reset-1', 'user-1', expect.any(String));
	});

	it('resetPassword throws INVALID_RESET_TOKEN when token consume fails', async () => {
		const authRepository = {
			findValidPasswordResetToken: vi.fn().mockResolvedValue({
				id: 'reset-1',
				userId: 'user-1',
			}),
			consumeResetTokenAndUpdatePassword: vi.fn().mockResolvedValue(false),
		};

		const authService = new AuthService(
			authRepository as never,
			() => 'token-123',
		);

		await expect(
			authService.resetPassword({
				token: 'valid-token',
				password: 'new-password-123',
			}),
		).rejects.toMatchObject({ code: errorCodes.INVALID_RESET_TOKEN });
	});
});
