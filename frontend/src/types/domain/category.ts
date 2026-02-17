import type { ID } from '../primitives';

export type CategoryIconName =
	| 'utensils'
	| 'car-front'
	| 'briefcase-business'
	| 'ticket'
	| 'piggy-bank'
	| 'shopping-cart'
	| 'heart-pulse'
	| 'paw-print'
	| 'house'
	| 'gift'
	| 'dumbbell'
	| 'book-open'
	| 'receipt-text'
	| 'mailbox'
	| 'tool-case'
	| 'baggage-claim';

export type CategoryColor =
	| 'blue'
	| 'green'
	| 'red'
	| 'yellow'
	| 'purple'
	| 'orange'
	| 'pink';

export interface Category {
	id: ID;
	name: string;
	icon: CategoryIconName;
	description: string | null;
	color: CategoryColor;
}
