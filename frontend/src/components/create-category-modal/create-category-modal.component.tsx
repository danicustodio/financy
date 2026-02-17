import { XIcon } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { useCreateCategoryForm } from '@/hooks/forms/use-create-category-form';
import { cn } from '@/lib/utils';
import type { CreateCategoryFormData } from '@/types/forms/categories';
import { Input } from '../input';
import { LabelButton } from '../label-button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { CATEGORY_COLORS, CATEGORY_ICONS } from './constants';

interface CreateCategoryModalProps {
	children: ReactNode;
}

export const CreateCategoryModal = ({ children }: CreateCategoryModalProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const { form, formError, isSubmitting, onSubmit } = useCreateCategoryForm(
		() => setIsOpen(false),
	);

	const selectedIcon = form.watch('icon');
	const selectedColor = form.watch('color');

	const titleError = form.formState.errors.title?.message;

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			form.reset();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent
				showCloseButton={false}
				className="flex flex-col gap-6 rounded-xl border-financy-gray-200 p-6 sm:max-w-md"
			>
				<div className="flex items-start gap-4">
					<div className="flex flex-1 flex-col gap-0.5">
						<DialogTitle className="font-semibold text-base text-financy-gray-800">
							Nova categoria
						</DialogTitle>
						<DialogDescription className="text-financy-gray-600 text-sm">
							Organize suas transações com categorias
						</DialogDescription>
					</div>
					<DialogClose className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-financy-gray-300 bg-white text-financy-gray-600 transition-colors hover:bg-financy-gray-100">
						<XIcon className="h-4 w-4" />
						<span className="sr-only">Fechar</span>
					</DialogClose>
				</div>

				<form onSubmit={onSubmit} className="flex flex-col gap-4">
					<Input
						id="title"
						label="Título"
						placeholder="Ex. Alimentação"
						error={!!titleError || !!formError}
						helper={titleError ?? formError ?? undefined}
						{...form.register('title')}
					/>

					<Input
						id="description"
						label="Descrição"
						placeholder="Ex. Gastos com alimentação"
						{...form.register('description')}
					/>

					<div className="flex flex-col gap-2">
						<span className="font-medium text-financy-gray-700 text-sm">
							Ícone
						</span>
						<div className="flex flex-wrap gap-2">
							{CATEGORY_ICONS.map(({ name, icon: Icon }) => (
								<button
									key={name}
									type="button"
									className={cn(
										'flex h-10.5 w-10.5 cursor-pointer items-center justify-center rounded-lg border transition-colors',
										selectedIcon === name
											? 'border-financy-brand-base bg-financy-gray-100'
											: 'border-financy-gray-300 hover:bg-financy-gray-100',
									)}
									onClick={() =>
										form.setValue(
											'icon',
											name as CreateCategoryFormData['icon'],
											{
												shouldDirty: true,
											},
										)
									}
								>
									<Icon className="h-5 w-5 text-financy-gray-700" />
								</button>
							))}
						</div>
					</div>

					<div className="mb-2 flex flex-col gap-2">
						<span className="font-medium text-financy-gray-700 text-sm">
							Cor
						</span>
						<div className="flex gap-2">
							{CATEGORY_COLORS.map(({ name, value }) => (
								<button
									key={name}
									type="button"
									className={cn(
										'flex flex-1 cursor-pointer items-center justify-center rounded-lg border p-1.25 transition-colors',
										selectedColor === name
											? 'border-financy-brand-base bg-financy-gray-100'
											: 'border-financy-gray-300',
									)}
									onClick={() =>
										form.setValue('color', name, {
											shouldDirty: true,
										})
									}
								>
									<div className={cn('h-5 w-full rounded', value)} />
								</button>
							))}
						</div>
					</div>

					<LabelButton
						variant="default"
						size="md"
						className="w-full"
						type="submit"
						loading={isSubmitting}
					>
						Salvar
					</LabelButton>
				</form>
			</DialogContent>
		</Dialog>
	);
};
