import type { CategoryColor } from '@/components/categories/category-card.component';

const categoryColorFallback: CategoryColor = 'blue';

const iconBackgroundByColor: Record<CategoryColor, string> = {
	blue: '#DBEAFE',
	purple: '#F3E8FF',
	yellow: '#F7F3CA',
	pink: '#FCE7F3',
	green: '#E0FAE9',
	orange: '#FFEDD5',
	red: '#FEE2E2',
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
});

const shortDateFormatter = new Intl.DateTimeFormat('pt-BR', {
	day: '2-digit',
	month: '2-digit',
	year: '2-digit',
});

export function toCategoryColor(color: string): CategoryColor {
	switch (color) {
		case 'blue':
		case 'purple':
		case 'yellow':
		case 'pink':
		case 'green':
		case 'orange':
		case 'red':
			return color;
		default:
			return categoryColorFallback;
	}
}

export function formatAmountFromCents(amountCents: number): string {
	return currencyFormatter.format(amountCents / 100);
}

export function formatDate(value: string): string {
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? '' : shortDateFormatter.format(date);
}

export function iconBackgroundColor(color: string): string {
	return iconBackgroundByColor[toCategoryColor(color)];
}
