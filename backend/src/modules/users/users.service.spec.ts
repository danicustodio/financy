import { describe, expect, it, vi } from 'vitest';
import { errorCodes } from '../../shared/errors/error-codes';
import { makePrismaKnownError } from '../../test/helpers';
import { UsersService } from './users.service';

const makeUser = () =>
	({
		id: 'user-1',
		name: 'John',
		email: 'john@example.com',
	}) as never;

describe('UsersService', () => {
	it('throws UNAUTHENTICATED when currentUser is null', async () => {
		const usersRepository = {
			findById: vi.fn(),
			updateById: vi.fn(),
		};
		const usersService = new UsersService(usersRepository as never);

		await expect(usersService.me(null)).rejects.toMatchObject({
			code: errorCodes.UNAUTHENTICATED,
		});
	});

	it('me returns stored user when found', async () => {
		const storedUser = {
			id: 'user-1',
			name: 'John',
			email: 'john@example.com',
		};
		const usersRepository = {
			findById: vi.fn().mockResolvedValue(storedUser),
			updateById: vi.fn(),
		};
		const usersService = new UsersService(usersRepository as never);

		await expect(usersService.me(makeUser())).resolves.toEqual(storedUser);
		expect(usersRepository.findById).toHaveBeenCalledWith('user-1');
	});

	it('me throws NOT_FOUND when user is missing in repository', async () => {
		const usersRepository = {
			findById: vi.fn().mockResolvedValue(null),
			updateById: vi.fn(),
		};
		const usersService = new UsersService(usersRepository as never);

		await expect(usersService.me(makeUser())).rejects.toMatchObject({
			code: errorCodes.NOT_FOUND,
		});
	});

	it('throws VALIDATION when updateMe receives no fields', async () => {
		const usersRepository = {
			findById: vi.fn(),
			updateById: vi.fn(),
		};
		const usersService = new UsersService(usersRepository as never);

		await expect(usersService.updateMe(makeUser(), {})).rejects.toMatchObject({
			code: errorCodes.VALIDATION,
		});
	});

	it('updateMe returns updated user on success', async () => {
		const updatedUser = {
			id: 'user-1',
			name: 'Johnny',
			email: 'john@example.com',
		};
		const usersRepository = {
			findById: vi.fn(),
			updateById: vi.fn().mockResolvedValue(updatedUser),
		};
		const usersService = new UsersService(usersRepository as never);

		await expect(
			usersService.updateMe(makeUser(), { name: 'Johnny' }),
		).resolves.toEqual(updatedUser);
		expect(usersRepository.updateById).toHaveBeenCalledWith('user-1', {
			name: 'Johnny',
		});
	});

	it('updateMe maps P2002 to CONFLICT', async () => {
		const usersRepository = {
			findById: vi.fn(),
			updateById: vi.fn().mockRejectedValue(makePrismaKnownError('P2002')),
		};
		const usersService = new UsersService(usersRepository as never);

		await expect(
			usersService.updateMe(makeUser(), { email: 'john@example.com' }),
		).rejects.toMatchObject({ code: errorCodes.CONFLICT });
	});

	it('updateMe maps P2025 to NOT_FOUND', async () => {
		const usersRepository = {
			findById: vi.fn(),
			updateById: vi.fn().mockRejectedValue(makePrismaKnownError('P2025')),
		};
		const usersService = new UsersService(usersRepository as never);

		await expect(
			usersService.updateMe(makeUser(), { name: 'Johnny' }),
		).rejects.toMatchObject({ code: errorCodes.NOT_FOUND });
	});
});
