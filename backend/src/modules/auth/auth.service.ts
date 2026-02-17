import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AppError } from '../../shared/errors/app-error';
import { errorCodes } from '../../shared/errors/error-codes';
import type { AuthRepository } from './auth.repository';
import type { LoginInput, SignUpInput } from './auth.validation';

export class AuthService {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly jwtSign: (payload: { sub: string }) => string,
	) {}

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
}
