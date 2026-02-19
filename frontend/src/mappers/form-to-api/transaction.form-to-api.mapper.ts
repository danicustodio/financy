import { parseAmount } from '@/mappers/amount.mapper';
import type {
	CreateTransactionInput,
	UpdateTransactionInput,
} from '@/types/api/operations';
import type {
	CreateTransactionFormData,
	UpdateTransactionFormData,
} from '@/types/forms/transactions';

export function toCreateTransactionInput(
	form: CreateTransactionFormData,
): CreateTransactionInput {
	return {
		description: form.description,
		amount: parseAmount(form.amount),
		type: form.type,
		date: new Date(form.date).toISOString(),
		categoryId: form.categoryId,
	};
}

export function toUpdateTransactionInput(
	form: UpdateTransactionFormData,
): UpdateTransactionInput {
	return {
		id: form.id,
		description: form.description,
		amount: parseAmount(form.amount),
		type: form.type,
		date: new Date(form.date).toISOString(),
		categoryId: form.categoryId,
	};
}
