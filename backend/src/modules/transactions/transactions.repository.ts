import type { Prisma, PrismaClient } from '@prisma/client';
import type {
	CreateTransactionInput,
	TransactionFilter,
	TransactionPagination,
} from './transactions.validation';

export class TransactionsRepository {
	constructor(private readonly prisma: PrismaClient) {}

	list(
		userId: string,
		filter?: TransactionFilter | null,
		pagination?: TransactionPagination | null,
	) {
		const where: Prisma.TransactionWhereInput = { userId };

		if (filter?.type != null) {
			where.type = filter.type;
		}

		if (filter?.categoryId != null) {
			where.categoryId = filter.categoryId;
		}

		if (filter?.search != null && filter.search.trim() !== '') {
			where.description = { contains: filter.search };
		}

		if (filter?.month != null && filter?.year != null) {
			const startOfMonth = new Date(filter.year, filter.month - 1, 1);
			const startOfNextMonth = new Date(filter.year, filter.month, 1);
			where.date = { gte: startOfMonth, lt: startOfNextMonth };
		}

		const skip =
			pagination != null ? (pagination.page - 1) * pagination.pageSize : 0;
		const take = pagination?.pageSize;

		return Promise.all([
			this.prisma.transaction.findMany({
				where,
				orderBy: { date: 'desc' },
				skip,
				take,
			}),
			this.prisma.transaction.count({ where }),
		]).then(([items, totalCount]) => ({ items, totalCount }));
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

	findByIdAndUserId(transactionId: string, userId: string) {
		return this.prisma.transaction.findFirst({
			where: { id: transactionId, userId },
		});
	}

	deleteById(transactionId: string) {
		return this.prisma.transaction.delete({
			where: { id: transactionId },
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
