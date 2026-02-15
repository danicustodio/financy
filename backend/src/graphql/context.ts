import type { PrismaClient, User } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';

export interface Context {
	prisma: PrismaClient;
	request: FastifyRequest;
	reply: FastifyReply;
	currentUser: User | null;
}

export async function buildContext(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<Context> {
	let currentUser: User | null = null;

	try {
		await request.jwtVerify();
		currentUser = await request.server.prisma.user.findUnique({
			where: { id: request.user.sub },
		});
	} catch {
		// No valid token — currentUser stays null (public access)
	}

	return { prisma: request.server.prisma, request, reply, currentUser };
}
