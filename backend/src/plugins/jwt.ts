import jwt from '@fastify/jwt';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { env } from '../env.js';

declare module '@fastify/jwt' {
	interface FastifyJWT {
		payload: { sub: string };
		user: { sub: string };
	}
}

export default fp(async (fastify: FastifyInstance) => {
	await fastify.register(jwt, {
		secret: env.JWT_SECRET,
		sign: { expiresIn: env.JWT_EXPIRES_IN },
	});
});
