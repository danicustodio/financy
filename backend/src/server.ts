import Fastify from 'fastify';
import mercurius from 'mercurius';
import { resolvers } from './graphql/resolvers.js';
import { schema } from './graphql/schema.js';
import prismaPlugin from './plugins/prisma.js';

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || '0.0.0.0';

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

	// Register Prisma plugin
	await app.register(prismaPlugin);

	// Register Mercurius (GraphQL)
	await app.register(mercurius, {
		schema,
		resolvers,
		graphiql: true, // GraphiQL playground at /graphiql
	});

	// Health check route
	app.get('/health', async () => {
		return { status: 'ok', timestamp: new Date().toISOString() };
	});

	try {
		const address = await app.listen({ port: PORT, host: HOST });
		app.log.info(`🚀 Server ready at ${address}`);
		app.log.info(`📊 GraphiQL playground at ${address}/graphiql`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

bootstrap();
