import { Prisma, type User } from '@prisma/client';
import { requireAuth } from '../../shared/auth/require-auth';
import { AppError } from '../../shared/errors/app-error';
import { errorCodes } from '../../shared/errors/error-codes';
import type { UsersRepository } from './users.repository';
import type { UpdateMeInput } from './users.validation';

export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async me(currentUser: User | null) {
		const user = requireAuth(currentUser);
		const storedUser = await this.usersRepository.findById(user.id);

		if (!storedUser) {
			throw new AppError(errorCodes.NOT_FOUND, 'User not found');
		}

		return storedUser;
	}

	async updateMe(currentUser: User | null, input: UpdateMeInput) {
		const user = requireAuth(currentUser);
		if (input.name == null && input.email == null) {
			throw new AppError(
				errorCodes.VALIDATION,
				'At least one field must be provided',
			);
		}

		try {
			return await this.usersRepository.updateById(user.id, input);
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === 'P2002'
			) {
				throw new AppError(errorCodes.CONFLICT, 'Email already in use');
			}

			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === 'P2025'
			) {
				throw new AppError(errorCodes.NOT_FOUND, 'User not found');
			}

			throw error;
		}
	}
}
