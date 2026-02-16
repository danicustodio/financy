import { CircleArrowDown, CircleArrowUp, X } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';
import { createTransactionFormRules } from '@/features/transactions/create-transaction';
import { cn } from '@/lib/utils';
import type { NewTransactionModalProps } from './new-transaction-modal.types';
import { transactionTypeButtonVariants } from './new-transaction-modal.variants';

export const NewTransactionModal = ({
	isOpen,
	onClose,
	form,
	categories,
	formError,
	isSubmitting,
	onSubmit,
}: NewTransactionModalProps) => {
	const {
		register,
		setValue,
		watch,
		formState: { errors },
	} = form;

	const transactionType = watch('type') ?? 'expense';

	if (!isOpen) return null;

	const handleTypeChange = (type: 'expense' | 'income') => {
		setValue('type', type);
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
				<form onSubmit={onSubmit} className="flex flex-col gap-4">
					<Input
						id="description"
						label="Descrição"
						placeholder="Ex. Almoço no restaurante"
						error={!!errors.description}
						helper={errors.description?.message}
						{...register('description', createTransactionFormRules.description)}
					/>

					<div className="flex gap-4">
						<div className="flex-1">
							<Input
								id="date"
								label="Data"
								type="date"
								placeholder="Selecione"
								error={!!errors.date}
								helper={errors.date?.message}
								{...register('date', createTransactionFormRules.date)}
							/>
						</div>
						<div className="flex-1">
							<Input
								id="amount"
								label="Valor"
								prefix="R$"
								placeholder="0,00"
								error={!!errors.amount}
								helper={errors.amount?.message}
								{...register('amount', createTransactionFormRules.amount)}
							/>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<label
							htmlFor="categoryId"
							className="font-medium text-financy-gray-700 text-sm"
						>
							Categoria
						</label>
						<select
							id="categoryId"
							className={cn(
								'w-full rounded-md border p-3 py-3.5 text-base outline-none',
								errors.categoryId
									? 'border-financy-red-base'
									: 'border-financy-gray-300',
								'bg-financy-white text-financy-gray-800',
							)}
							{...register('categoryId', createTransactionFormRules.categoryId)}
						>
							<option value="">Selecione</option>
							{categories.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
						{errors.categoryId && (
							<p className="text-financy-red-base text-xs">
								{errors.categoryId.message}
							</p>
						)}
					</div>

					{formError && (
						<p className="rounded-md bg-red-50 p-3 text-center text-financy-red-base text-sm">
							{formError}
						</p>
					)}

					<LabelButton
						variant="default"
						size="md"
						className="w-full"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Salvando...' : 'Salvar'}
					</LabelButton>
				</form>
			</div>
		</div>
	);
};
