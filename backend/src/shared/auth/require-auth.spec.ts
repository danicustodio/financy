import { describe, expect, it } from 'vitest';
import { requireAuth } from './require-auth';

describe('requireAuth', () => {
	it('returns current user when authenticated', () => {
		const currentUser = {
			id: 'user-1',
			name: 'John',
			email: 'john@example.com',
		} as never;

		expect(requireAuth(currentUser)).toBe(currentUser);
	});

	it('throws when current user is null', () => {
		expect(() => requireAuth(null)).toThrowError(
			expect.objectContaining({ code: 'UNAUTHENTICATED' }),
		);
	});
});
