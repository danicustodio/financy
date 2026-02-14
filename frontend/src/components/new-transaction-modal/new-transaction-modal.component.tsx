import { CircleArrowDown, CircleArrowUp, X } from 'lucide-react';
import { useState } from 'react';
import { IconButton } from '@/components/icon-button';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';
import { cn } from '@/lib/utils';
import type {
	NewTransactionModalProps,
	TransactionFormData,
} from './new-transaction-modal.types';
import { transactionTypeButtonVariants } from './new-transaction-modal.variants';

export const NewTransactionModal = ({
	isOpen,
	onClose,
	onSubmit,
}: NewTransactionModalProps) => {
	const [transactionType, setTransactionType] = useState<'expense' | 'income'>(
		'expense',
	);
	const [formData, setFormData] = useState<TransactionFormData>({
		description: '',
		date: '',
		amount: '0,00',
		category: '',
		type: 'expense',
	});

	if (!isOpen) return null;

	const handleTypeChange = (type: 'expense' | 'income') => {
		setTransactionType(type);
		setFormData((prev) => ({ ...prev, type }));
	};

	const handleInputChange = (
		field: keyof TransactionFormData,
		value: string,
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = () => {
		onSubmit?.(formData);
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: Overlay close on click outside */}
			{/* biome-ignore lint/a11y/noStaticElementInteractions: Overlay backdrop */}
			<div className="absolute inset-0" onClick={onClose} />
			<div className="relative flex w-full max-w-md flex-col gap-6 rounded-xl border border-financy-gray-200 bg-white p-6">
				{/* Header */}
				<div className="flex items-start justify-between">
					<div className="flex flex-col gap-1">
						<h2
							id="modal-title"
							className="font-semibold text-financy-gray-800 text-lg"
						>
							Nova transação
						</h2>
						<p className="text-financy-gray-600 text-sm">
							Registre sua despesa ou receita
						</p>
					</div>
					<IconButton
						icon={<X size={16} />}
						variant="outline"
						size="sm"
						onClick={onClose}
						aria-label="Fechar modal"
					/>
				</div>

				{/* Transaction Type Toggle */}
				<div className="flex rounded-xl border border-financy-gray-200 p-1">
					<button
						type="button"
						className={cn(
							transactionTypeButtonVariants({
								type: 'expense',
								active: transactionType === 'expense',
							}),
						)}
						onClick={() => handleTypeChange('expense')}
					>
						<CircleArrowDown
							size={20}
							className={
								transactionType === 'expense'
									? 'text-financy-red-base'
									: 'text-financy-gray-500'
							}
						/>
						Despesa
					</button>
					<button
						type="button"
						className={cn(
							transactionTypeButtonVariants({
								type: 'income',
								active: transactionType === 'income',
							}),
						)}
						onClick={() => handleTypeChange('income')}
					>
						<CircleArrowUp
							size={20}
							className={
								transactionType === 'income'
									? 'text-financy-green-base'
									: 'text-financy-gray-500'
							}
						/>
						Receita
					</button>
				</div>

				{/* Form */}
				<div className="flex flex-col gap-4">
					<Input
						id="description"
						label="Descrição"
						placeholder="Ex. Almoço no restaurante"
						value={formData.description}
						onChange={(e) => handleInputChange('description', e.target.value)}
					/>

					<div className="flex gap-4">
						<div className="flex-1">
							<Input
								id="date"
								label="Data"
								type="date"
								placeholder="Selecione"
								value={formData.date}
								onChange={(e) => handleInputChange('date', e.target.value)}
							/>
						</div>
						<div className="flex-1">
							<Input
								id="amount"
								label="Valor"
								prefix="R$"
								placeholder="0,00"
								value={formData.amount}
								onChange={(e) => handleInputChange('amount', e.target.value)}
							/>
						</div>
					</div>

					<Input
						id="category"
						label="Categoria"
						placeholder="Selecione"
						value={formData.category}
						onChange={(e) => handleInputChange('category', e.target.value)}
					/>
				</div>

				{/* Submit Button */}
				<LabelButton
					variant="default"
					size="md"
					className="w-full"
					onClick={handleSubmit}
				>
					Salvar
				</LabelButton>
			</div>
		</div>
	);
};
