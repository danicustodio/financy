import { describe, expect, it } from 'vitest';
import { toUpdateTransactionInput } from './transaction.form-to-api.mapper';

describe('toUpdateTransactionInput', () => {
	it('maps form data into update transaction api payload', () => {
		const output = toUpdateTransactionInput({
			id: '2f6f1af8-3fa9-4f89-a4fd-fd3d44aeb3d9',
			description: 'Mercado',
			date: '2026-02-10',
			amount: '321,90',
			categoryId: '4ed94108-5e08-4739-a689-8f8f4b3b2ccf',
			type: 'expense',
		});

		expect(output).toEqual({
			id: '2f6f1af8-3fa9-4f89-a4fd-fd3d44aeb3d9',
			description: 'Mercado',
			date: new Date('2026-02-10').toISOString(),
			amount: 32190,
			categoryId: '4ed94108-5e08-4739-a689-8f8f4b3b2ccf',
			type: 'expense',
		});
	});
});
