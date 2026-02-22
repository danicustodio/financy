import type { PrismaClient } from '@prisma/client';
import type { UpdateMeInput } from './users.validation';

export class UsersRepository {
	constructor(private readonly prisma: PrismaClient) {}

	findById(id: string) {
		return this.prisma.user.findUnique({ where: { id } });
	}

	updateById(id: string, input: UpdateMeInput) {
		return this.prisma.user.update({
			where: { id },
			data: {
				...(input.name != null && { name: input.name }),
				...(input.email != null && { email: input.email }),
			},
		});
	}
}
