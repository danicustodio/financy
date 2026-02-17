import type { PrismaClient } from '@prisma/client';
import { AuthRepository } from './auth/auth.repository';
import { AuthService } from './auth/auth.service';
import { CategoriesRepository } from './categories/categories.repository';
import { CategoriesService } from './categories/categories.service';
import { DashboardService } from './dashboard/dashboard.service';
import { TransactionsRepository } from './transactions/transactions.repository';
import { TransactionsService } from './transactions/transactions.service';
import { UsersRepository } from './users/users.repository';
import { UsersService } from './users/users.service';

interface CreateServicesInput {
	prisma: PrismaClient;
	jwtSign: (payload: { sub: string }) => string;
}

export function createServices({ prisma, jwtSign }: CreateServicesInput) {
	const authRepository = new AuthRepository(prisma);
	const usersRepository = new UsersRepository(prisma);
	const categoriesRepository = new CategoriesRepository(prisma);
	const transactionsRepository = new TransactionsRepository(prisma);

	return {
		auth: new AuthService(authRepository, jwtSign),
		users: new UsersService(usersRepository),
		categories: new CategoriesService(categoriesRepository),
		transactions: new TransactionsService(
			transactionsRepository,
			categoriesRepository,
		),
		dashboard: new DashboardService(transactionsRepository),
	};
}

export type Services = ReturnType<typeof createServices>;
