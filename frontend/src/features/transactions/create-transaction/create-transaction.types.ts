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
