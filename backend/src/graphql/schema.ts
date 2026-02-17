import { builder } from './builder';

import '../modules/users/users.schema';
import '../modules/users/users.resolver';

import '../modules/auth/auth.schema';
import '../modules/auth/auth.resolver';

import '../modules/categories/categories.schema';
import '../modules/categories/categories.resolver';

import '../modules/transactions/transactions.schema';
import '../modules/transactions/transactions.resolver';

import '../modules/dashboard/dashboard.schema';
import '../modules/dashboard/dashboard.resolver';

export const schema = builder.toSchema();
