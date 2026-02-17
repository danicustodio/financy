import type { UseFormReturn } from 'react-hook-form';
import type { CreateCategoryFormData } from '@/hooks/forms/create-category-form.types';

export interface NewCategoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	form: UseFormReturn<CreateCategoryFormData>;
	formError: string | null;
	isSubmitting: boolean;
	onSubmit: () => void;
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
