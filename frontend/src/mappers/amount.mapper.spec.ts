import { describe, expect, it } from 'vitest';
import { formatAmountInput, parseAmount } from './amount.mapper';

describe('amount mapper', () => {
	it('formats cents to pt-BR decimal input', () => {
		expect(formatAmountInput(12345)).toBe('123,45');
		expect(formatAmountInput(10)).toBe('0,10');
	});

	it('parses pt-BR input to cents', () => {
		expect(parseAmount('123,45')).toBe(12345);
		expect(parseAmount('1.234,56')).toBe(123456);
	});
});
