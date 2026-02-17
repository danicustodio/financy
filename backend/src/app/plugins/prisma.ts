import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}

export default fp(async (fastify: FastifyInstance) => {
	const adapter = new PrismaBetterSqlite3({
		url: 'file:./prisma/dev.db',
	});

	const prisma = new PrismaClient({ adapter });
	fastify.decorate('prisma', prisma);

	fastify.addHook('onClose', async (instance) => {
		await instance.prisma.$disconnect();
	});
});
