import type { PrismaClient } from '@prisma/client';
import type { CreateTransactionInput } from './transactions.validation';

export class TransactionsRepository {
	constructor(private readonly prisma: PrismaClient) {}

	listByUserId(userId: string) {
		return this.prisma.transaction.findMany({
			where: { userId },
			orderBy: { date: 'desc' },
		});
	}

	create(userId: string, input: CreateTransactionInput) {
		return this.prisma.transaction.create({
			data: {
				description: input.description,
				amount: input.amount,
				type: input.type,
				date: input.date,
				categoryId: input.categoryId,
				userId,
			},
		});
	}

	aggregateAmount(
		userId: string,
		type: 'income' | 'expense',
		dateRange?: { gte: Date; lt: Date },
	) {
		return this.prisma.transaction.aggregate({
			where: {
				userId,
				type,
				...(dateRange != null && { date: dateRange }),
			},
			_sum: { amount: true },
		});
	}
}
