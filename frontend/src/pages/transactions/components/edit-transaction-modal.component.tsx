import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import {
	CategoriesSelection,
	TransactionToggle,
} from '@/components/create-transaction-modal';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	toUpdateTransactionFormDefaults,
	useUpdateTransactionForm,
} from '@/hooks/forms/use-update-transaction-form';
import { useListCategories } from '@/hooks/queries/use-list-categories';
import type { Transaction } from '@/types/domain/transaction';

interface EditTransactionModalProps {
	transaction: Transaction | null;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export const EditTransactionModal = ({
	transaction,
	isOpen,
	onOpenChange,
}: EditTransactionModalProps) => {
	const { data: categories = [], isLoading: isLoadingCategories } =
		useListCategories();

	const { form, formError, isSubmitting, onSubmit } = useUpdateTransactionForm(
		transaction,
		() => onOpenChange(false),
	);

	const selectedType = form.watch('type');
	const selectedCategoryId = form.watch('categoryId');

	const descriptionError = form.formState.errors.description?.message;
	const dateError = form.formState.errors.date?.message;
	const amountError = form.formState.errors.amount?.message;
	const categoryError = form.formState.errors.categoryId?.message ?? formError;

	useEffect(() => {
		if (transaction != null) {
			form.reset(toUpdateTransactionFormDefaults(transaction));
		}
	}, [form, transaction]);

	if (transaction == null) {
		return null;
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent
				showCloseButton={false}
				className="flex flex-col gap-6 rounded-xl border-financy-gray-200 p-6 sm:max-w-md"
			>
				<div className="flex items-start gap-4">
					<div className="flex flex-1 flex-col gap-0.5">
						<DialogTitle className="font-semibold text-base text-financy-gray-800">
							Editar transação
						</DialogTitle>
						<DialogDescription className="text-financy-gray-600 text-sm">
							Atualize os dados da transação
						</DialogDescription>
					</div>
					<DialogClose className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-financy-gray-300 bg-white text-financy-gray-600 transition-colors hover:bg-financy-gray-100">
						<XIcon className="h-4 w-4" />
						<span className="sr-only">Fechar</span>
					</DialogClose>
				</div>

				<TransactionToggle
					value={selectedType}
					onChange={(value) => {
						form.setValue('type', value, {
							shouldDirty: true,
							shouldValidate: true,
						});
					}}
				/>

				<form onSubmit={onSubmit} className="flex flex-col gap-4">
					<input type="hidden" {...form.register('id')} />
					<input type="hidden" {...form.register('type')} />
					<input type="hidden" {...form.register('categoryId')} />

					<Input
						id={`description-${transaction.id}`}
						label="Descrição"
						placeholder="Ex. Almoço no restaurante"
						error={!!descriptionError}
						helper={descriptionError}
						{...form.register('description')}
					/>

					<div className="flex gap-4">
						<div className="min-w-0 flex-1">
							<Input
								id={`date-${transaction.id}`}
								label="Data"
								type="date"
								placeholder="Selecione"
								error={!!dateError}
								helper={dateError}
								{...form.register('date')}
							/>
						</div>

						<div className="min-w-0 flex-1">
							<Input
								id={`amount-${transaction.id}`}
								label="Valor"
								prefix="R$"
								placeholder="0,00"
								error={!!amountError}
								helper={amountError}
								{...form.register('amount')}
							/>
						</div>
					</div>

					<CategoriesSelection
						categories={categories}
						selectedCategoryId={selectedCategoryId}
						isLoading={isLoadingCategories}
						errorMessage={categoryError ?? undefined}
						onSelect={(categoryId) =>
							form.setValue('categoryId', categoryId, {
								shouldDirty: true,
								shouldValidate: true,
							})
						}
					/>

					<LabelButton
						variant="default"
						size="md"
						className="w-full"
						type="submit"
						loading={isSubmitting}
						disabled={isLoadingCategories || categories.length === 0}
					>
						Salvar alterações
					</LabelButton>
				</form>
			</DialogContent>
		</Dialog>
	);
};
