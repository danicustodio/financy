import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { TRANSACTION_TYPES } from '@/constants/transaction';
import { parseAmount } from '@/mappers/amount.mapper';
import {
	CREATE_TRANSACTION_ERROR_FALLBACK,
	CREATE_TRANSACTION_ERROR_RULES,
} from '@/mappers/errors/graphql-error-rules';
import { mapGraphQLError } from '@/mappers/errors/graphql-error.mapper';
import { toCreateTransactionInput } from '@/mappers/form-to-api/transaction.form-to-api.mapper';
import type { CreateTransactionFormData } from '@/types/forms/transactions';
import { useCreateTransactionMutation } from '../mutations/use-create-transaction-mutation';

export const createTransactionSchema = z.object({
	description: z.string().min(1, 'Descrição é obrigatória'),
	date: z
		.string()
		.min(1, 'Data é obrigatória')
		.refine((value) => !Number.isNaN(new Date(value).getTime()), {
			message: 'Data inválida',
		}),
	amount: z
		.string()
		.min(1, 'Valor é obrigatório')
		.refine((value) => {
			const num = parseAmount(value);
			return !Number.isNaN(num) && num > 0;
		}, 'Valor deve ser positivo'),
	categoryId: z.string().min(1, 'Categoria é obrigatória'),
	type: z.enum(TRANSACTION_TYPES),
});

export function useCreateTransactionForm(onSuccess?: () => void) {
	const [formError, setFormError] = useState<string | null>(null);
	const createTransactionMutation = useCreateTransactionMutation();

	const form = useForm<CreateTransactionFormData>({
		resolver: zodResolver(createTransactionSchema),
		defaultValues: {
			type: 'expense',
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		setFormError(null);

		try {
			await createTransactionMutation.mutateAsync(
				toCreateTransactionInput(data),
			);

			onSuccess?.();
		} catch (error) {
			setFormError(
				mapGraphQLError(
					error,
					CREATE_TRANSACTION_ERROR_FALLBACK,
					CREATE_TRANSACTION_ERROR_RULES,
				),
			);
		}
	});

	return {
		form,
		formError,
		isSubmitting: createTransactionMutation.isPending,
		onSubmit,
	};
}
