import { describe, expect, it, vi } from 'vitest';
import { errorCodes } from '../../shared/errors/error-codes';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
	it('throws VALIDATION for invalid month', async () => {
		const transactionsRepository = {
			aggregateAmount: vi.fn(),
		};
		const dashboardService = new DashboardService(
			transactionsRepository as never,
		);

		await expect(
			dashboardService.summary(
				{ id: 'user-1', name: 'John', email: 'john@example.com' } as never,
				13,
				2026,
			),
		).rejects.toMatchObject({ code: errorCodes.VALIDATION });
	});
});
