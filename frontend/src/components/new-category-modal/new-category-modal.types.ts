export interface NewCategoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit?: (data: CategoryFormData) => void;
}

export interface CategoryFormData {
	title: string;
	description: string;
	icon: CategoryIcon;
	color: CategoryColor;
}

export type CategoryColor =
	| 'blue'
	| 'purple'
	| 'yellow'
	| 'pink'
	| 'green'
	| 'orange'
	| 'red';

export type CategoryIcon =
	| 'utensils'
	| 'car-front'
	| 'briefcase-business'
	| 'ticket'
	| 'piggy-bank'
	| 'shopping-cart'
	| 'heart-pulse'
	| 'tag'
	| 'tool-case'
	| 'paw-print'
	| 'house'
	| 'gift'
	| 'dumbbell'
	| 'book-open'
	| 'receipt-text'
	| 'mailbox';
