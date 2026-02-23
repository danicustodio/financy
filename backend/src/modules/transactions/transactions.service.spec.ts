import { describe, expect, it, vi } from 'vitest';
import { errorCodes } from '../../shared/errors/error-codes';
import { TransactionsService } from './transactions.service';

const makeUser = () =>
	({
		id: 'user-1',
		name: 'John',
		email: 'john@example.com',
	}) as never;

const makeUnusedCategoriesRepo = () => ({ findByIdAndUserId: vi.fn() });

describe('TransactionsService', () => {
	it('list throws UNAUTHENTICATED when currentUser is null', async () => {
		const transactionsRepository = {
			list: vi.fn(),
		};
		const unusedCategoriesRepo = makeUnusedCategoriesRepo();
		const service = new TransactionsService(
			transactionsRepository as never,
			unusedCategoriesRepo as never,
		);

		expect(() => service.list(null)).toThrowError(
			expect.objectContaining({ code: errorCodes.UNAUTHENTICATED }),
		);
		expect(unusedCategoriesRepo.findByIdAndUserId).not.toHaveBeenCalled();
	});

	it('list forwards user id, filter and pagination', async () => {
		const payload = { items: [], totalCount: 0 };
		const filter = { type: 'income' } as never;
		const pagination = { page: 2, pageSize: 10 } as never;
		const transactionsRepository = {
			list: vi.fn().mockResolvedValue(payload),
		};
		const unusedCategoriesRepo = makeUnusedCategoriesRepo();
		const service = new TransactionsService(
			transactionsRepository as never,
			unusedCategoriesRepo as never,
		);

		await expect(service.list(makeUser(), filter, pagination)).resolves.toEqual(
			payload,
		);
		expect(transactionsRepository.list).toHaveBeenCalledWith(
			'user-1',
			filter,
			pagination,
		);
		expect(unusedCategoriesRepo.findByIdAndUserId).not.toHaveBeenCalled();
	});

	it('delete throws NOT_FOUND when transaction does not exist', async () => {
		const transactionsRepository = {
			findByIdAndUserId: vi.fn().mockResolvedValue(null),
			deleteById: vi.fn(),
		};
		const unusedCategoriesRepo = makeUnusedCategoriesRepo();
		const service = new TransactionsService(
			transactionsRepository as never,
			unusedCategoriesRepo as never,
		);

		await expect(service.delete(makeUser(), 'tx-1')).rejects.toMatchObject({
			code: errorCodes.NOT_FOUND,
		});
		expect(unusedCategoriesRepo.findByIdAndUserId).not.toHaveBeenCalled();
	});

	it('delete returns true on success', async () => {
		const transactionsRepository = {
			findByIdAndUserId: vi.fn().mockResolvedValue({ id: 'tx-1' }),
			deleteById: vi.fn().mockResolvedValue(undefined),
		};
		const unusedCategoriesRepo = makeUnusedCategoriesRepo();
		const service = new TransactionsService(
			transactionsRepository as never,
			unusedCategoriesRepo as never,
		);

		await expect(service.delete(makeUser(), 'tx-1')).resolves.toBe(true);
		expect(transactionsRepository.deleteById).toHaveBeenCalledWith('tx-1');
		expect(unusedCategoriesRepo.findByIdAndUserId).not.toHaveBeenCalled();
	});

	it('create throws NOT_FOUND when category does not exist', async () => {
		const transactionsRepository = {
			create: vi.fn(),
		};
		const categoriesRepository = {
			findByIdAndUserId: vi.fn().mockResolvedValue(null),
		};
		const service = new TransactionsService(
			transactionsRepository as never,
			categoriesRepository as never,
		);

		await expect(
			service.create(makeUser(), {
				description: 'Lunch',
				amount: 2000,
				type: 'expense',
				date: new Date('2026-02-10T00:00:00.000Z'),
				categoryId: 'cat-1',
			} as never),
		).rejects.toMatchObject({ code: errorCodes.NOT_FOUND });
	});

	it('create returns transaction on success', async () => {
		const input = {
			description: 'Salary',
			amount: 800000,
			type: 'income',
			date: new Date('2026-02-10T00:00:00.000Z'),
			categoryId: 'cat-1',
		};
		const created = { id: 'tx-1', ...input };
		const transactionsRepository = {
			create: vi.fn().mockResolvedValue(created),
		};
		const categoriesRepository = {
			findByIdAndUserId: vi.fn().mockResolvedValue({ id: 'cat-1' }),
		};
		const service = new TransactionsService(
			transactionsRepository as never,
			categoriesRepository as never,
		);

		await expect(service.create(makeUser(), input as never)).resolves.toEqual(
			created,
		);
		expect(transactionsRepository.create).toHaveBeenCalledWith(
			'user-1',
			input as never,
		);
	});

	it('update throws NOT_FOUND when transaction does not exist', async () => {
		const transactionsRepository = {
			findByIdAndUserId: vi.fn().mockResolvedValue(null),
			update: vi.fn(),
		};
		const categoriesRepository = {
			findByIdAndUserId: vi.fn(),
		};
		const service = new TransactionsService(
			transactionsRepository as never,
			categoriesRepository as never,
		);

		await expect(
			service.update(makeUser(), {
				id: 'tx-1',
				description: 'Updated',
				amount: 3000,
				type: 'expense',
				date: new Date('2026-02-10T00:00:00.000Z'),
				categoryId: 'cat-1',
			} as never),
		).rejects.toMatchObject({ code: errorCodes.NOT_FOUND });
	});

	it('update throws NOT_FOUND when category does not exist', async () => {
		const transactionsRepository = {
			findByIdAndUserId: vi.fn().mockResolvedValue({ id: 'tx-1' }),
			update: vi.fn(),
		};
		const categoriesRepository = {
			findByIdAndUserId: vi.fn().mockResolvedValue(null),
		};
		const service = new TransactionsService(
			transactionsRepository as never,
			categoriesRepository as never,
		);

		await expect(
			service.update(makeUser(), {
				id: 'tx-1',
				description: 'Updated',
				amount: 3000,
				type: 'expense',
				date: new Date('2026-02-10T00:00:00.000Z'),
				categoryId: 'cat-1',
			} as never),
		).rejects.toMatchObject({ code: errorCodes.NOT_FOUND });
	});

	it('update returns updated transaction on success', async () => {
		const input = {
			id: 'tx-1',
			description: 'Updated',
			amount: 3000,
			type: 'expense',
			date: new Date('2026-02-10T00:00:00.000Z'),
			categoryId: 'cat-1',
		};
		const updated = { ...input };
		const transactionsRepository = {
			findByIdAndUserId: vi.fn().mockResolvedValue({ id: 'tx-1' }),
			update: vi.fn().mockResolvedValue(updated),
		};
		const categoriesRepository = {
			findByIdAndUserId: vi.fn().mockResolvedValue({ id: 'cat-1' }),
		};
		const service = new TransactionsService(
			transactionsRepository as never,
			categoriesRepository as never,
		);

		await expect(service.update(makeUser(), input as never)).resolves.toEqual(
			updated,
		);
		expect(transactionsRepository.update).toHaveBeenCalledWith(input as never);
	});
});
