import type { PrismaClient } from '@prisma/client';
import type { SignUpInput } from './auth.validation';

export class AuthRepository {
	constructor(private readonly prisma: PrismaClient) {}

	findUserByEmail(email: string) {
		return this.prisma.user.findUnique({ where: { email } });
	}

	createUser(input: SignUpInput, passwordHash: string) {
		return this.prisma.user.create({
			data: {
				name: input.name,
				email: input.email,
				passwordHash,
			},
		});
	}
}
