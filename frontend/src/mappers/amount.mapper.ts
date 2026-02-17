export function parseAmountToCents(value: string): number {
	const cleaned = value.replace(/\./g, '').replace(',', '.');
	return Math.round(Number.parseFloat(cleaned) * 100);
}
