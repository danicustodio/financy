import type { PrismaClient, User } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Services } from '../modules/services';

export interface Context {
	prisma: PrismaClient;
	request: FastifyRequest;
	reply: FastifyReply;
	currentUser: User | null;
	services: Services;
}

export async function buildContext(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<Context> {
	const { prisma, services } = request.server;

	try {
		await request.jwtVerify();
	} catch {
		return { prisma, request, reply, currentUser: null, services };
	}

	const currentUser = await prisma.user.findUnique({
		where: { id: request.user.sub },
	});

	return { prisma, request, reply, currentUser, services };
}
