import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import ValidationPlugin from '@pothos/plugin-validation';
import { env } from '../env.js';
import type PrismaTypes from '../generated/prisma-pothos-types.js';
import { getDatamodel } from '../generated/prisma-pothos-types.js';
import type { Context } from './context.js';

export const builder = new SchemaBuilder<{
	Context: Context;
	PrismaTypes: PrismaTypes;
	Scalars: {
		DateTime: {
			Input: Date;
			Output: Date | string;
		};
	};
}>({
	plugins: [PrismaPlugin, ValidationPlugin],
	prisma: {
		client: (ctx) => ctx.prisma,
		dmmf: getDatamodel(),
		onUnusedQuery: env.NODE_ENV === 'production' ? null : 'warn',
	},
});

builder.queryType({});
builder.mutationType({});
