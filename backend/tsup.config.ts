import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/**/*.ts'],
	format: ['esm'],
	target: 'es2022',
	outDir: 'dist',
	clean: true,
	sourcemap: true,
	bundle: false,
});
