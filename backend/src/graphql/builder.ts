import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import ValidationPlugin from '@pothos/plugin-validation';
import { env } from '../env';
import type PrismaTypes from '../generated/prisma-pothos-types';
import { getDatamodel } from '../generated/prisma-pothos-types';
import type { Context } from './context';

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
	plugins: [PrismaPlugin, SimpleObjectsPlugin, ValidationPlugin],
	prisma: {
		client: (ctx) => ctx.prisma,
		dmmf: getDatamodel(),
		onUnusedQuery: env.NODE_ENV === 'production' ? null : 'warn',
	},
});

builder.queryType({});
builder.mutationType({});
