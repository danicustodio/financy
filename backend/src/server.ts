import cors from '@fastify/cors';
import Fastify from 'fastify';
import mercurius from 'mercurius';
import { env } from './env';
import { buildContext } from './graphql/context';
import { schema } from './graphql/schema';
import jwtPlugin from './plugins/jwt';
import prismaPlugin from './plugins/prisma';

async function bootstrap() {
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
	await app.register(mercurius, {
		schema,
		graphiql: true,
		context: buildContext,
	});

	app.get('/health', async () => {
		return { status: 'ok', timestamp: new Date().toISOString() };
	});

	try {
		const address = await app.listen({ port: env.PORT, host: env.HOST });
		app.log.info(`🚀 Server ready at ${address}`);
		app.log.info(`📊 GraphiQL playground at ${address}/graphiql`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

bootstrap();
