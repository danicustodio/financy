import { describe, expect, it, vi } from 'vitest';
import { errorCodes } from '../../shared/errors/error-codes';
import { DashboardService } from './dashboard.service';

const makeUser = () =>
	({
		id: 'user-1',
		name: 'John',
		email: 'john@example.com',
	}) as never;

describe('DashboardService', () => {
	it('throws UNAUTHENTICATED when currentUser is null', async () => {
		const transactionsRepository = {
			aggregateAmount: vi.fn(),
		};
		const dashboardService = new DashboardService(
			transactionsRepository as never,
		);

		await expect(dashboardService.summary(null, 2, 2026)).rejects.toMatchObject(
			{
				code: errorCodes.UNAUTHENTICATED,
			},
		);
	});

	it('throws VALIDATION for invalid month', async () => {
		const transactionsRepository = {
			aggregateAmount: vi.fn(),
		};
		const dashboardService = new DashboardService(
			transactionsRepository as never,
		);

		await expect(
			dashboardService.summary(makeUser(), 13, 2026),
		).rejects.toMatchObject({ code: errorCodes.VALIDATION });
	});

	it('throws VALIDATION for invalid year', async () => {
		const transactionsRepository = {
			aggregateAmount: vi.fn(),
		};
		const dashboardService = new DashboardService(
			transactionsRepository as never,
		);

		await expect(
			dashboardService.summary(makeUser(), 2, 1960),
		).rejects.toMatchObject({ code: errorCodes.VALIDATION });
	});

	it('returns computed summary with explicit month/year and null sums as zero', async () => {
		const transactionsRepository = {
			aggregateAmount: vi
				.fn()
				.mockResolvedValueOnce({ _sum: { amount: 10000 } })
				.mockResolvedValueOnce({ _sum: { amount: 3500 } })
				.mockResolvedValueOnce({ _sum: { amount: null } })
				.mockResolvedValueOnce({ _sum: { amount: 1200 } }),
		};
		const dashboardService = new DashboardService(
			transactionsRepository as never,
		);

		const result = await dashboardService.summary(makeUser(), 2, 2026);

		expect(result).toEqual({
			totalBalance: 6500,
			monthlyIncome: 0,
			monthlyExpense: 1200,
		});
		expect(transactionsRepository.aggregateAmount).toHaveBeenNthCalledWith(
			1,
			'user-1',
			'income',
		);
		expect(transactionsRepository.aggregateAmount).toHaveBeenNthCalledWith(
			2,
			'user-1',
			'expense',
		);
		expect(transactionsRepository.aggregateAmount).toHaveBeenNthCalledWith(
			3,
			'user-1',
			'income',
			{
				gte: new Date(2026, 1, 1),
				lt: new Date(2026, 2, 1),
			},
		);
		expect(transactionsRepository.aggregateAmount).toHaveBeenNthCalledWith(
			4,
			'user-1',
			'expense',
			{
				gte: new Date(2026, 1, 1),
				lt: new Date(2026, 2, 1),
			},
		);
	});

	it('uses current date defaults when month/year are omitted', async () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2026-08-20T12:00:00.000Z'));

		const transactionsRepository = {
			aggregateAmount: vi.fn().mockResolvedValue({ _sum: { amount: 0 } }),
		};
		const dashboardService = new DashboardService(
			transactionsRepository as never,
		);

		await dashboardService.summary(makeUser());

		expect(transactionsRepository.aggregateAmount).toHaveBeenNthCalledWith(
			3,
			'user-1',
			'income',
			{
				gte: new Date(2026, 7, 1),
				lt: new Date(2026, 8, 1),
			},
		);
	});
});
