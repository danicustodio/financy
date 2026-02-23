import { Prisma } from '@prisma/client';

export function makePrismaKnownError(code: string) {
	const error = Object.create(
		Prisma.PrismaClientKnownRequestError.prototype,
	) as Prisma.PrismaClientKnownRequestError;
	return Object.assign(error, { code });
}
