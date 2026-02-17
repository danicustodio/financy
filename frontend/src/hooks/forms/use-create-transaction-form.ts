import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseAmount } from '@/mappers/amount.mapper';
import { mapCreateTransactionError } from '@/mappers/create-transaction.mapper';
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
	type: z.enum(['expense', 'income']),
});

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;

export interface CategoryOption {
	id: string;
	name: string;
	color: string;
}

export interface CreateTransactionResponse {
	createTransaction: {
		id: string;
	};
}

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
			await createTransactionMutation.mutateAsync({
				description: data.description,
				amount: parseAmount(data.amount),
				type: data.type,
				date: new Date(data.date).toISOString(),
				categoryId: data.categoryId,
			});

			onSuccess?.();
		} catch (error) {
			setFormError(mapCreateTransactionError(error));
		}
	});

	return {
		form,
		formError,
		isSubmitting: createTransactionMutation.isPending,
		onSubmit,
	};
}
