import { builder } from './builder.js';

// Import all type definitions (side-effect imports)
import './types/auth.js';
import './types/user.js';

// Build and export the executable schema
export const schema = builder.toSchema();
