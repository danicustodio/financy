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

	async invalidateActiveResetTokensByUser(userId: string) {
		await this.prisma.passwordResetToken.updateMany({
			where: {
				userId,
				usedAt: null,
				expiresAt: {
					gt: new Date(),
				},
			},
			data: {
				usedAt: new Date(),
			},
		});
	}

	createPasswordResetToken(
		userId: string,
		tokenHash: string,
		expiresAt: Date,
	) {
		return this.prisma.passwordResetToken.create({
			data: {
				userId,
				tokenHash,
				expiresAt,
			},
		});
	}

	findValidPasswordResetToken(tokenHash: string) {
		return this.prisma.passwordResetToken.findFirst({
			where: {
				tokenHash,
				usedAt: null,
				expiresAt: {
					gt: new Date(),
				},
			},
		});
	}

	async consumeResetTokenAndUpdatePassword(
		tokenId: string,
		userId: string,
		passwordHash: string,
	): Promise<boolean> {
		return this.prisma.$transaction(async (tx) => {
			const result = await tx.passwordResetToken.updateMany({
				where: {
					id: tokenId,
					userId,
					usedAt: null,
					expiresAt: {
						gt: new Date(),
					},
				},
				data: {
					usedAt: new Date(),
				},
			});

			if (result.count !== 1) {
				return false;
			}

			await tx.user.update({
				where: {
					id: userId,
				},
				data: {
					passwordHash,
				},
			});

			return true;
		});
	}
}
