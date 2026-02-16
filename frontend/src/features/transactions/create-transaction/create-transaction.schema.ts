import type { RegisterOptions } from 'react-hook-form';
import type { CreateTransactionFormData } from './create-transaction.types';

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
			const cleaned = value.replace(/\./g, '').replace(',', '.');
			const num = Number.parseFloat(cleaned);
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
