import { builder } from './builder';

// Import all type definitions (side-effect imports)
import './types/auth';
import './types/category';
import './types/transaction';
import './types/user';

// Build and export the executable schema
export const schema = builder.toSchema();
