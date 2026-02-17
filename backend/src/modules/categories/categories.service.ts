import { Prisma, type User } from '@prisma/client';
import { requireAuth } from '../../shared/auth/require-auth';
import { AppError } from '../../shared/errors/app-error';
import { errorCodes } from '../../shared/errors/error-codes';
import type { CategoriesRepository } from './categories.repository';
import type { CreateCategoryInput } from './categories.validation';

export class CategoriesService {
	constructor(private readonly categoriesRepository: CategoriesRepository) {}

	list(currentUser: User | null) {
		const user = requireAuth(currentUser);
		return this.categoriesRepository.listByUserId(user.id);
	}

	async summary(currentUser: User | null) {
		const user = requireAuth(currentUser);

		const [totalCategories, totalTransactions, mostUsedCategory] =
			await Promise.all([
				this.categoriesRepository.countAllByUserId(user.id),
				this.categoriesRepository.countTransactionsByUserId(user.id),
				this.categoriesRepository.findMostUsedByUserId(user.id),
			]);

		return { totalCategories, totalTransactions, mostUsedCategory };
	}

	async create(currentUser: User | null, input: CreateCategoryInput) {
		const user = requireAuth(currentUser);

		try {
			return await this.categoriesRepository.create(user.id, input);
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === 'P2002'
			) {
				throw new AppError(
					errorCodes.CONFLICT,
					'Category with this name already exists',
				);
			}

			throw error;
		}
	}
}
