import type { PrismaClient } from '@prisma/client';
import type { CreateCategoryInput } from './categories.validation';

export class CategoriesRepository {
	constructor(private readonly prisma: PrismaClient) {}

	listByUserId(userId: string) {
		return this.prisma.category.findMany({
			where: { userId },
			orderBy: { title: 'asc' },
		});
	}

	create(userId: string, input: CreateCategoryInput) {
		return this.prisma.category.create({
			data: {
				title: input.title,
				icon: input.icon,
				description: input.description,
				color: input.color,
				userId,
			},
		});
	}

	findByIdAndUserId(categoryId: string, userId: string) {
		return this.prisma.category.findFirst({
			where: { id: categoryId, userId },
		});
	}

	countTransactionsByCategoryIdAndUserId(categoryId: string, userId: string) {
		return this.prisma.transaction.count({
			where: { categoryId, userId },
		});
	}

	deleteById(categoryId: string) {
		return this.prisma.category.delete({
			where: { id: categoryId },
		});
	}

	countAllByUserId(userId: string) {
		return this.prisma.category.count({ where: { userId } });
	}

	countTransactionsByUserId(userId: string) {
		return this.prisma.transaction.count({ where: { userId } });
	}

	async findMostUsedByUserId(userId: string) {
		const [topGroup] = await this.prisma.transaction.groupBy({
			by: ['categoryId'],
			where: { userId },
			_count: { id: true },
			orderBy: [{ _count: { id: 'desc' } }, { categoryId: 'asc' }],
			take: 1,
		});

		if (topGroup == null) {
			return null;
		}

		const category = await this.prisma.category.findUnique({
			where: { id: topGroup.categoryId },
			select: { id: true, title: true, icon: true, color: true },
		});

		if (category == null) {
			return null;
		}

		return { ...category, transactionCount: topGroup._count.id };
	}
}
