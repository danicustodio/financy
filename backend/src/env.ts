import { z } from 'zod';

const envSchema = z.object({
	JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
	JWT_EXPIRES_IN: z.string().default('7d'),
	PORT: z.coerce.number().default(4000),
	HOST: z.string().default('0.0.0.0'),
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
	console.error('❌ Invalid environment variables:');
	console.error(z.treeifyError(result.error));
	process.exit(1);
}

export const env = result.data;
