import type { PrismaClient, User } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { createServices, type Services } from '../modules/services';

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
	let currentUser: User | null = null;

	try {
		await request.jwtVerify();
		currentUser = await request.server.prisma.user.findUnique({
			where: { id: request.user.sub },
		});
	} catch {
		currentUser = null;
	}

	const services = createServices({
		prisma: request.server.prisma,
		jwtSign: (payload) => request.server.jwt.sign(payload),
	});

	return {
		prisma: request.server.prisma,
		request,
		reply,
		currentUser,
		services,
	};
}
