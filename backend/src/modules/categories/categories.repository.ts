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
}
