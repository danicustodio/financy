import { useState } from 'react';
import { type RegisterOptions, useForm } from 'react-hook-form';
import { parseAmount } from '@/mappers/amount.mapper';
import { mapCreateTransactionError } from '@/mappers/create-transaction.mapper';
import { useCreateTransactionMutation } from '../mutations/use-create-transaction-mutation';

export interface CreateTransactionFormData {
	description: string;
	date: string;
	amount: string;
	categoryId: string;
	type: 'expense' | 'income';
}

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

export const createTransactionFormRules: {
	[K in keyof CreateTransactionFormData]: RegisterOptions<
		CreateTransactionFormData,
		K
	>;
} = {
	description: {
		required: 'Descrição é obrigatória',
		minLength: {
			value: 1,
			message: 'Descrição é obrigatória',
		},
	},
	date: {
		required: 'Data é obrigatória',
	},
	amount: {
		required: 'Valor é obrigatório',
		validate: (value) => {
			const num = parseAmount(value);
			if (Number.isNaN(num) || num <= 0) {
				return 'Valor deve ser positivo';
			}
			return true;
		},
	},
	categoryId: {
		required: 'Categoria é obrigatória',
	},
	type: {
		required: 'Tipo é obrigatório',
	},
};

export function useCreateTransactionForm(onSuccess?: () => void) {
	const [formError, setFormError] = useState<string | null>(null);
	const createTransactionMutation = useCreateTransactionMutation();

	const form = useForm<CreateTransactionFormData>({
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
