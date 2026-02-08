export interface TransactionFormData {
	description: string;
	date: string;
	amount: string;
	category: string;
	type: 'expense' | 'income';
}

export interface NewTransactionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit?: (data: TransactionFormData) => void;
}
