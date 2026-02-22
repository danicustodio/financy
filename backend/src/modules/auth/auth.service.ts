import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'node:crypto';
import { AppError } from '../../shared/errors/app-error';
import { errorCodes } from '../../shared/errors/error-codes';
import type { AuthRepository } from './auth.repository';
import type {
	LoginInput,
	RequestPasswordResetInput,
	ResetPasswordInput,
	SignUpInput,
} from './auth.validation';

export class AuthService {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly jwtSign: (payload: { sub: string }) => string,
	) {}

	private hashResetToken(token: string): string {
		return createHash('sha256').update(token).digest('hex');
	}

	async login(input: LoginInput) {
		const user = await this.authRepository.findUserByEmail(input.email);

		if (!user) {
			throw new AppError(errorCodes.INVALID_CREDENTIALS, 'Invalid credentials');
		}

		const validPassword = await bcrypt.compare(
			input.password,
			user.passwordHash,
		);
		if (!validPassword) {
			throw new AppError(errorCodes.INVALID_CREDENTIALS, 'Invalid credentials');
		}

		const token = this.jwtSign({ sub: user.id });
		return { token, user };
	}

	async signUp(input: SignUpInput) {
		const passwordHash = await bcrypt.hash(input.password, 12);

		try {
			const user = await this.authRepository.createUser(input, passwordHash);
			const token = this.jwtSign({ sub: user.id });

			return { token, user };
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === 'P2002'
			) {
				throw new AppError(errorCodes.CONFLICT, 'Email already in use');
			}

			throw error;
		}
	}

	async requestPasswordReset(input: RequestPasswordResetInput): Promise<string | null> {
		const user = await this.authRepository.findUserByEmail(input.email);

		if (!user) {
			return null;
		}

		const token = randomBytes(32).toString('hex');
		const tokenHash = this.hashResetToken(token);
		const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

		await this.authRepository.invalidateActiveResetTokensByUser(user.id);
		await this.authRepository.createPasswordResetToken(
			user.id,
			tokenHash,
			expiresAt,
		);

		if (process.env.NODE_ENV !== 'production') {
			console.log(`[DEV] Password reset token for ${input.email}: ${token}`);
		}

		return token;
	}

	async resetPassword(input: ResetPasswordInput): Promise<boolean> {
		const tokenHash = this.hashResetToken(input.token);
		const tokenRecord =
			await this.authRepository.findValidPasswordResetToken(tokenHash);

		if (!tokenRecord) {
			throw new AppError(
				errorCodes.INVALID_RESET_TOKEN,
				'Reset token is invalid or expired',
			);
		}

		const passwordHash = await bcrypt.hash(input.password, 12);
		const consumed = await this.authRepository.consumeResetTokenAndUpdatePassword(
			tokenRecord.id,
			tokenRecord.userId,
			passwordHash,
		);

		if (!consumed) {
			throw new AppError(
				errorCodes.INVALID_RESET_TOKEN,
				'Reset token is invalid or expired',
			);
		}

		return true;
	}
}
