const amountFormatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
});

export function presentAmount(amount: number): string {
	return amountFormatter.format(amount / 100);
}

export function parseAmount(value: string): number {
	const cleaned = value.replace(/\./g, '').replace(',', '.');
	const parsedValue = Number.parseFloat(cleaned);
	if (Number.isNaN(parsedValue)) {
		return Number.NaN;
	}

	return Math.round(parsedValue * 100);
}
