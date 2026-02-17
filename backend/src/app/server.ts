import cors from '@fastify/cors';
import Fastify from 'fastify';
import mercurius from 'mercurius';
import { schema } from '../graphql/schema';
import { createServices, type Services } from '../modules/services';
import { env } from './config/env';
import { buildContext } from './context';
import jwtPlugin from './plugins/jwt';
import prismaPlugin from './plugins/prisma';

declare module 'fastify' {
	interface FastifyInstance {
		services: Services;
	}
}

export async function createApp() {
	const app = Fastify({
		logger: {
			level: 'info',
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
				},
			},
		},
	});

	await app.register(cors, {
		origin: '*',
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	});

	await app.register(prismaPlugin);
	await app.register(jwtPlugin);

	const services = createServices({
		prisma: app.prisma,
		jwtSign: (payload) => app.jwt.sign(payload),
	});
	app.decorate('services', services);

	await app.register(mercurius, {
		schema,
		graphiql: true,
		context: buildContext,
	});

	app.get('/health', async () => {
		return { status: 'ok', timestamp: new Date().toISOString() };
	});

	return app;
}

export async function startServer() {
	const app = await createApp();

	try {
		const address = await app.listen({ port: env.PORT, host: env.HOST });
		app.log.info(`Server ready at ${address}`);
		app.log.info(`GraphiQL playground at ${address}/graphiql`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}
