import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { graphqlRequest } from '@/lib/graphql-client';
import { mapCreateTransactionError } from './create-transaction.mapper';
import type {
	CreateTransactionFormData,
	CreateTransactionResponse,
} from './create-transaction.types';
import { parseAmountToCents } from './create-transaction.utils';

const CREATE_TRANSACTION_MUTATION = `
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
    }
  }
`;

export function useCreateTransactionForm(onSuccess?: () => void) {
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm<CreateTransactionFormData>({
		defaultValues: {
			type: 'expense',
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		setFormError(null);

		try {
			await graphqlRequest<
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
