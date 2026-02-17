import {
	BaggageClaim,
	BookOpen,
	BriefcaseBusiness,
	CarFront,
	Dumbbell,
	Gift,
	HeartPulse,
	House,
	type LucideIcon,
	Mailbox,
	PawPrint,
	PiggyBank,
	ReceiptText,
	ShoppingCart,
	Ticket,
	ToolCase,
	Utensils,
} from 'lucide-react';
import type { CategoryColor, CategoryIconName } from '@/types/domain/category';

export const CATEGORY_ICON_NAMES = [
	'utensils',
	'car-front',
	'briefcase-business',
	'ticket',
	'piggy-bank',
	'shopping-cart',
	'heart-pulse',
	'paw-print',
	'house',
	'gift',
	'dumbbell',
	'book-open',
	'receipt-text',
	'mailbox',
	'tool-case',
	'baggage-claim',
] as const satisfies readonly CategoryIconName[];

export const CATEGORY_COLOR_NAMES = [
	'blue',
	'green',
	'red',
	'yellow',
	'purple',
	'orange',
	'pink',
] as const satisfies readonly CategoryColor[];

export const CATEGORY_ICON_COMPONENT_BY_NAME: Record<
	CategoryIconName,
	LucideIcon
> = {
	'briefcase-business': BriefcaseBusiness,
	'car-front': CarFront,
	'heart-pulse': HeartPulse,
	'piggy-bank': PiggyBank,
	'shopping-cart': ShoppingCart,
	ticket: Ticket,
	'tool-case': ToolCase,
	utensils: Utensils,
	'paw-print': PawPrint,
	house: House,
	gift: Gift,
	dumbbell: Dumbbell,
	'book-open': BookOpen,
	'baggage-claim': BaggageClaim,
	mailbox: Mailbox,
	'receipt-text': ReceiptText,
};

export const CATEGORY_ICONS = CATEGORY_ICON_NAMES.map((name) => ({
	name,
	icon: CATEGORY_ICON_COMPONENT_BY_NAME[name],
}));

export const CATEGORY_COLORS: ReadonlyArray<{
	name: CategoryColor;
	value: string;
}> = [
	{ name: 'green', value: 'bg-financy-green-base' },
	{ name: 'blue', value: 'bg-financy-blue-base' },
	{ name: 'purple', value: 'bg-financy-purple-base' },
	{ name: 'pink', value: 'bg-financy-pink-base' },
	{ name: 'red', value: 'bg-financy-red-base' },
	{ name: 'orange', value: 'bg-financy-orange-base' },
	{ name: 'yellow', value: 'bg-financy-yellow-base' },
] as const;

export const ICON_BACKGROUND_BY_COLOR: Record<CategoryColor, string> = {
	blue: '#DBEAFE',
	purple: '#F3E8FF',
	yellow: '#F7F3CA',
	pink: '#FCE7F3',
	green: '#E0FAE9',
	orange: '#FFEDD5',
	red: '#FEE2E2',
};

export const CATEGORY_COLOR_FALLBACK: CategoryColor = 'blue';
