import { parseAmount } from '@/mappers/amount.mapper';
import type { CreateTransactionInput } from '@/types/api/operations';
import type { CreateTransactionFormData } from '@/types/forms/transactions';

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
