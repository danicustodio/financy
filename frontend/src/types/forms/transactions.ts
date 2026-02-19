import type { TransactionType } from '@/types/domain/transaction';

export interface CreateTransactionFormData {
	description: string;
	date: string;
	amount: string;
	categoryId: string;
	type: TransactionType;
}

export interface UpdateTransactionFormData extends CreateTransactionFormData {
	id: string;
}

export interface CategoryOption {
	id: string;
	name: string;
	color: string;
}
