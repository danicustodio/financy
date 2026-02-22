import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { env } from '../config/env';

declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}

export default fp(async (fastify: FastifyInstance) => {
	const adapter = new PrismaBetterSqlite3({
		url: env.DATABASE_URL,
	});

	const prisma = new PrismaClient({ adapter });
	fastify.decorate('prisma', prisma);

	fastify.addHook('onClose', async (instance) => {
		await instance.prisma.$disconnect();
	});
});
