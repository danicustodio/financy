/**
 * Converts a BRL-formatted string (e.g. "1.234,56") to integer cents (123456).
 */
export function parseAmountToCents(value: string): number {
	const cleaned = value.replace(/\./g, '').replace(',', '.');
	return Math.round(Number.parseFloat(cleaned) * 100);
}
