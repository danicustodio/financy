import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LIST_CATEGORIES_QUERY_KEY } from '@/features/categories/list-categories';
import { LIST_TRANSACTIONS_QUERY_KEY } from '@/features/transactions/list-transactions';
import { CREATE_TRANSACTION_MUTATION } from '@/lib/graphql';
import { authGraphqlRequest } from '@/lib/graphql/graphql-client';
import { mapCreateTransactionError } from './create-transaction.mapper';
import type {
	CreateTransactionFormData,
	CreateTransactionResponse,
} from './create-transaction.types';
import { parseAmountToCents } from './create-transaction.utils';

export function useCreateTransactionForm(onSuccess?: () => void) {
	const [formError, setFormError] = useState<string | null>(null);
	const queryClient = useQueryClient();

	const form = useForm<CreateTransactionFormData>({
		defaultValues: {
			type: 'expense',
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		setFormError(null);

		try {
			await authGraphqlRequest<
				CreateTransactionResponse,
				{ input: Record<string, unknown> }
			>(CREATE_TRANSACTION_MUTATION, {
				input: {
					description: data.description,
					amountCents: parseAmountToCents(data.amount),
					type: data.type,
					date: new Date(data.date).toISOString(),
					categoryId: data.categoryId,
				},
			})();
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: LIST_TRANSACTIONS_QUERY_KEY,
				}),
				queryClient.invalidateQueries({ queryKey: LIST_CATEGORIES_QUERY_KEY }),
			]);

			onSuccess?.();
		} catch (error) {
			setFormError(mapCreateTransactionError(error));
		}
	});

	return {
		form,
		formError,
		isSubmitting: form.formState.isSubmitting,
		onSubmit,
	};
}
