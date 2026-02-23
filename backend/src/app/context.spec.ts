import { describe, expect, it, vi } from 'vitest';
import { buildContext } from './context';

describe('buildContext', () => {
	it('returns null currentUser when jwt verification fails', async () => {
		const prisma = {
			user: {
				findUnique: vi.fn(),
			},
		};
		const services = { users: {} };
		const request = {
			server: { prisma, services },
			jwtVerify: vi.fn().mockRejectedValue(new Error('invalid token')),
		} as never;
		const reply = {} as never;

		const result = await buildContext(request, reply);

		expect(result.currentUser).toBeNull();
		expect(result.prisma).toBe(prisma);
		expect(result.services).toBe(services);
		expect(prisma.user.findUnique).not.toHaveBeenCalled();
	});

	it('returns resolved currentUser when jwt verification succeeds and user exists', async () => {
		const currentUser = {
			id: 'user-1',
			name: 'John',
			email: 'john@example.com',
		};
		const prisma = {
			user: {
				findUnique: vi.fn().mockResolvedValue(currentUser),
			},
		};
		const services = { users: {} };
		const request = {
			server: { prisma, services },
			jwtVerify: vi.fn().mockResolvedValue(undefined),
			user: { sub: 'user-1' },
		} as never;
		const reply = {} as never;

		const result = await buildContext(request, reply);

		expect(result.currentUser).toEqual(currentUser);
		expect(prisma.user.findUnique).toHaveBeenCalledWith({
			where: { id: 'user-1' },
		});
	});

	it('returns null currentUser when jwt succeeds but user is not found', async () => {
		const prisma = {
			user: {
				findUnique: vi.fn().mockResolvedValue(null),
			},
		};
		const services = { users: {} };
		const request = {
			server: { prisma, services },
			jwtVerify: vi.fn().mockResolvedValue(undefined),
			user: { sub: 'missing-user' },
		} as never;
		const reply = {} as never;

		const result = await buildContext(request, reply);

		expect(result.currentUser).toBeNull();
		expect(result.prisma).toBe(prisma);
		expect(result.services).toBe(services);
	});
});
