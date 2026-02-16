import type { UseFormReturn } from 'react-hook-form';
import type {
	CategoryOption,
	CreateTransactionFormData,
} from '@/features/transactions/create-transaction';

export type { CreateTransactionFormData as TransactionFormData };

export interface NewTransactionModalProps {
	isOpen: boolean;
	onClose: () => void;
	form: UseFormReturn<CreateTransactionFormData>;
	categories: CategoryOption[];
	formError: string | null;
	isSubmitting: boolean;
	onSubmit: () => void;
}
