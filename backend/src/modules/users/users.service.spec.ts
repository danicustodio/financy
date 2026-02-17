import { describe, expect, it, vi } from 'vitest';
import { errorCodes } from '../../shared/errors/error-codes';
import { UsersService } from './users.service';

describe('UsersService', () => {
	it('throws UNAUTHENTICATED when currentUser is null', async () => {
		const usersRepository = {
			findById: vi.fn(),
			updateById: vi.fn(),
			deleteById: vi.fn(),
		};
		const usersService = new UsersService(usersRepository as never);

		await expect(usersService.me(null)).rejects.toMatchObject({
			code: errorCodes.UNAUTHENTICATED,
		});
	});

	it('throws VALIDATION when updateMe receives no fields', async () => {
		const usersRepository = {
			findById: vi.fn(),
			updateById: vi.fn(),
			deleteById: vi.fn(),
		};
		const usersService = new UsersService(usersRepository as never);

		await expect(
			usersService.updateMe(
				{ id: 'user-1', name: 'John', email: 'john@example.com' } as never,
				{},
			),
		).rejects.toMatchObject({ code: errorCodes.VALIDATION });
	});
});
