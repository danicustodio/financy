import { describe, expect, it, vi } from 'vitest';
import { errorCodes } from '../../shared/errors/error-codes';
import { makePrismaKnownError } from '../../test/helpers';
import { CategoriesService } from './categories.service';

const makeUser = () =>
	({
		id: 'user-1',
		name: 'John',
		email: 'john@example.com',
	}) as never;

describe('CategoriesService', () => {
	it('list throws UNAUTHENTICATED when currentUser is null', async () => {
		const repository = {
			listByUserId: vi.fn(),
		};
		const service = new CategoriesService(repository as never);

		expect(() => service.list(null)).toThrowError(
			expect.objectContaining({ code: errorCodes.UNAUTHENTICATED }),
		);
	});

	it('list returns categories for authenticated user', async () => {
		const categories = [{ id: 'cat-1', title: 'Food' }];
		const repository = {
			listByUserId: vi.fn().mockResolvedValue(categories),
		};
		const service = new CategoriesService(repository as never);

		await expect(service.list(makeUser())).resolves.toEqual(categories);
		expect(repository.listByUserId).toHaveBeenCalledWith('user-1');
	});

	it('summary throws UNAUTHENTICATED when currentUser is null', async () => {
		const repository = {
			countAllByUserId: vi.fn(),
			countTransactionsByUserId: vi.fn(),
			findMostUsedByUserId: vi.fn(),
		};
		const service = new CategoriesService(repository as never);

		await expect(service.summary(null)).rejects.toMatchObject({
			code: errorCodes.UNAUTHENTICATED,
		});
	});

	it('summary returns aggregate fields', async () => {
		const mostUsedCategory = {
			id: 'cat-1',
			title: 'Food',
			icon: 'utensils',
			color: 'blue',
			transactionCount: 3,
		};
		const repository = {
			countAllByUserId: vi.fn().mockResolvedValue(5),
			countTransactionsByUserId: vi.fn().mockResolvedValue(12),
			findMostUsedByUserId: vi.fn().mockResolvedValue(mostUsedCategory),
		};
		const service = new CategoriesService(repository as never);

		await expect(service.summary(makeUser())).resolves.toEqual({
			totalCategories: 5,
			totalTransactions: 12,
			mostUsedCategory,
		});
	});

	it('create returns created category', async () => {
		const input = {
			title: 'Food',
			icon: 'utensils',
			description: 'Meals',
			color: 'blue',
		};
		const created = { id: 'cat-1', ...input };
		const repository = {
			create: vi.fn().mockResolvedValue(created),
		};
		const service = new CategoriesService(repository as never);

		await expect(service.create(makeUser(), input as never)).resolves.toEqual(
			created,
		);
		expect(repository.create).toHaveBeenCalledWith('user-1', input as never);
	});

	it('create maps P2002 to CONFLICT', async () => {
		const repository = {
			create: vi.fn().mockRejectedValue(makePrismaKnownError('P2002')),
		};
		const service = new CategoriesService(repository as never);

		await expect(
			service.create(makeUser(), {
				title: 'Food',
				icon: 'utensils',
				color: 'blue',
			} as never),
		).rejects.toMatchObject({ code: errorCodes.CONFLICT });
	});

	it('delete throws NOT_FOUND when category does not exist', async () => {
		const repository = {
			findByIdAndUserId: vi.fn().mockResolvedValue(null),
			countTransactionsByCategoryIdAndUserId: vi.fn(),
			deleteById: vi.fn(),
		};
		const service = new CategoriesService(repository as never);

		await expect(service.delete(makeUser(), 'cat-1')).rejects.toMatchObject({
			code: errorCodes.NOT_FOUND,
		});
	});

	it('delete throws CONFLICT when category has transactions', async () => {
		const repository = {
			findByIdAndUserId: vi.fn().mockResolvedValue({ id: 'cat-1' }),
			countTransactionsByCategoryIdAndUserId: vi.fn().mockResolvedValue(2),
			deleteById: vi.fn(),
		};
		const service = new CategoriesService(repository as never);

		await expect(service.delete(makeUser(), 'cat-1')).rejects.toMatchObject({
			code: errorCodes.CONFLICT,
		});
		expect(repository.deleteById).not.toHaveBeenCalled();
	});

	it('delete maps P2003 to CONFLICT', async () => {
		const repository = {
			findByIdAndUserId: vi.fn().mockResolvedValue({ id: 'cat-1' }),
			countTransactionsByCategoryIdAndUserId: vi.fn().mockResolvedValue(0),
			deleteById: vi.fn().mockRejectedValue(makePrismaKnownError('P2003')),
		};
		const service = new CategoriesService(repository as never);

		await expect(service.delete(makeUser(), 'cat-1')).rejects.toMatchObject({
			code: errorCodes.CONFLICT,
		});
	});

	it('delete returns true on success', async () => {
		const repository = {
			findByIdAndUserId: vi.fn().mockResolvedValue({ id: 'cat-1' }),
			countTransactionsByCategoryIdAndUserId: vi.fn().mockResolvedValue(0),
			deleteById: vi.fn().mockResolvedValue(undefined),
		};
		const service = new CategoriesService(repository as never);

		await expect(service.delete(makeUser(), 'cat-1')).resolves.toBe(true);
		expect(repository.deleteById).toHaveBeenCalledWith('cat-1');
	});

	it('update throws NOT_FOUND when category does not exist', async () => {
		const repository = {
			findByIdAndUserId: vi.fn().mockResolvedValue(null),
			update: vi.fn(),
		};
		const service = new CategoriesService(repository as never);

		await expect(
			service.update(makeUser(), {
				id: 'cat-1',
				title: 'Food',
				icon: 'utensils',
				color: 'blue',
			} as never),
		).rejects.toMatchObject({ code: errorCodes.NOT_FOUND });
	});

	it('update maps P2002 to CONFLICT', async () => {
		const repository = {
			findByIdAndUserId: vi.fn().mockResolvedValue({ id: 'cat-1' }),
			update: vi.fn().mockRejectedValue(makePrismaKnownError('P2002')),
		};
		const service = new CategoriesService(repository as never);

		await expect(
			service.update(makeUser(), {
				id: 'cat-1',
				title: 'Food',
				icon: 'utensils',
				color: 'blue',
			} as never),
		).rejects.toMatchObject({ code: errorCodes.CONFLICT });
	});

	it('update returns updated category on success', async () => {
		const updated = {
			id: 'cat-1',
			title: 'Groceries',
			icon: 'shopping-cart',
			color: 'green',
		};
		const input = updated as never;
		const repository = {
			findByIdAndUserId: vi.fn().mockResolvedValue({ id: 'cat-1' }),
			update: vi.fn().mockResolvedValue(updated),
		};
		const service = new CategoriesService(repository as never);

		await expect(service.update(makeUser(), input)).resolves.toEqual(updated);
		expect(repository.update).toHaveBeenCalledWith(input);
	});
});
