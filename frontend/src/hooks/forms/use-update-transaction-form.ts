import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { formatAmountInput } from '@/mappers/amount.mapper';
import { mapGraphQLError } from '@/mappers/errors/graphql-error.mapper';
import {
	UPDATE_TRANSACTION_ERROR_FALLBACK,
	UPDATE_TRANSACTION_ERROR_RULES,
} from '@/mappers/errors/graphql-error-rules';
import { toUpdateTransactionInput } from '@/mappers/form-to-api/transaction.form-to-api.mapper';
import type { Transaction } from '@/types/domain/transaction';
import type { UpdateTransactionFormData } from '@/types/forms/transactions';
import { useUpdateTransactionMutation } from '../mutations/use-update-transaction-mutation';
import { createTransactionSchema } from './use-create-transaction-form';

const updateTransactionSchema = createTransactionSchema.extend({
	id: z.uuid('Id da transação inválido'),
});

function toDateInputValue(date: string): string {
	const parsedDate = new Date(date);
	if (Number.isNaN(parsedDate.getTime())) {
		return '';
	}

	return parsedDate.toISOString().slice(0, 10);
}

export function toUpdateTransactionFormDefaults(
	transaction: Transaction,
): UpdateTransactionFormData {
	return {
		id: transaction.id,
		description: transaction.description,
		date: toDateInputValue(transaction.date),
		amount: formatAmountInput(transaction.amount),
		categoryId: transaction.category.id,
		type: transaction.type,
	};
}

export function useUpdateTransactionForm(
	transaction: Transaction | null,
	onSuccess?: () => void,
) {
	const [formError, setFormError] = useState<string | null>(null);
	const updateTransactionMutation = useUpdateTransactionMutation();

	const form = useForm<UpdateTransactionFormData>({
		resolver: zodResolver(updateTransactionSchema),
		defaultValues:
			transaction == null
				? {
						id: '',
						description: '',
						date: '',
						amount: '',
						categoryId: '',
						type: 'expense',
					}
				: toUpdateTransactionFormDefaults(transaction),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		setFormError(null);

		try {
			await updateTransactionMutation.mutateAsync(
				toUpdateTransactionInput(data),
			);
			onSuccess?.();
		} catch (error) {
			setFormError(
				mapGraphQLError(
					error,
					UPDATE_TRANSACTION_ERROR_FALLBACK,
					UPDATE_TRANSACTION_ERROR_RULES,
				),
			);
		}
	});

	return {
		form,
		formError,
		isSubmitting: updateTransactionMutation.isPending,
		onSubmit,
	};
}
