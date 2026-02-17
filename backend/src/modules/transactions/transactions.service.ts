import type { User } from '@prisma/client';
import { requireAuth } from '../../shared/auth/require-auth';
import { AppError } from '../../shared/errors/app-error';
import { errorCodes } from '../../shared/errors/error-codes';
import type { CategoriesRepository } from '../categories/categories.repository';
import type { TransactionsRepository } from './transactions.repository';
import type { CreateTransactionInput } from './transactions.validation';

export class TransactionsService {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly categoriesRepository: CategoriesRepository,
	) {}

	list(currentUser: User | null) {
		const user = requireAuth(currentUser);
		return this.transactionsRepository.listByUserId(user.id);
	}

	async create(currentUser: User | null, input: CreateTransactionInput) {
		const user = requireAuth(currentUser);

		const category = await this.categoriesRepository.findByIdAndUserId(
			input.categoryId,
			user.id,
		);

		if (!category) {
			throw new AppError(errorCodes.NOT_FOUND, 'Category not found');
		}

		return this.transactionsRepository.create(user.id, input);
	}
}
