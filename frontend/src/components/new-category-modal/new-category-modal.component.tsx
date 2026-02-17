import {
	BookOpen,
	Briefcase,
	CarFront,
	Dumbbell,
	Gift,
	HeartPulse,
	House,
	Mailbox,
	PawPrint,
	PiggyBank,
	ReceiptText,
	ShoppingCart,
	Tag,
	Ticket,
	Utensils,
	Wrench,
	X,
} from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { IconTile } from '@/components/icon-tile';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';
import { createCategoryFormRules } from '@/hooks/forms/use-create-category-form';
import { cn } from '@/lib/utils';
import type {
	CategoryColor,
	CategoryIcon,
	NewCategoryModalProps,
} from './new-category-modal.types';

const CATEGORY_ICONS: { id: CategoryIcon; icon: React.ReactNode }[] = [
	{ id: 'utensils', icon: <Utensils size={20} /> },
	{ id: 'car-front', icon: <CarFront size={20} /> },
	{ id: 'briefcase-business', icon: <Briefcase size={20} /> },
	{ id: 'ticket', icon: <Ticket size={20} /> },
	{ id: 'piggy-bank', icon: <PiggyBank size={20} /> },
	{ id: 'shopping-cart', icon: <ShoppingCart size={20} /> },
	{ id: 'heart-pulse', icon: <HeartPulse size={20} /> },
	{ id: 'tag', icon: <Tag size={20} /> },
	{ id: 'tool-case', icon: <Wrench size={20} /> },
	{ id: 'paw-print', icon: <PawPrint size={20} /> },
	{ id: 'house', icon: <House size={20} /> },
	{ id: 'gift', icon: <Gift size={20} /> },
	{ id: 'dumbbell', icon: <Dumbbell size={20} /> },
	{ id: 'book-open', icon: <BookOpen size={20} /> },
	{ id: 'receipt-text', icon: <ReceiptText size={20} /> },
	{ id: 'mailbox', icon: <Mailbox size={20} /> },
];

const CATEGORY_COLORS: {
	id: CategoryColor;
	bgClass: string;
	borderClass: string;
}[] = [
	{
		id: 'blue',
		bgClass: 'bg-financy-blue-light',
		borderClass: 'border-financy-blue-base',
	},
	{
		id: 'purple',
		bgClass: 'bg-financy-purple-light',
		borderClass: 'border-financy-purple-base',
	},
	{
		id: 'yellow',
		bgClass: 'bg-financy-yellow-light',
		borderClass: 'border-financy-yellow-base',
	},
	{
		id: 'pink',
		bgClass: 'bg-financy-pink-light',
		borderClass: 'border-financy-pink-base',
	},
	{
		id: 'green',
		bgClass: 'bg-financy-green-light',
		borderClass: 'border-financy-green-base',
	},
	{
		id: 'orange',
		bgClass: 'bg-financy-orange-light',
		borderClass: 'border-financy-orange-base',
	},
	{
		id: 'red',
		bgClass: 'bg-financy-red-light',
		borderClass: 'border-financy-red-base',
	},
];

export const NewCategoryModal = ({
	isOpen,
	onClose,
	form,
	formError,
	isSubmitting,
	onSubmit,
}: NewCategoryModalProps) => {
	if (!isOpen) return null;

	const selectedIcon = form.watch('icon');
	const selectedColor = form.watch('color');
	const nameError = form.formState.errors.name?.message;

	const previewIcon = CATEGORY_ICONS.find(
		({ id }) => id === selectedIcon,
	)?.icon;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: Overlay close on click outside */}
			{/* biome-ignore lint/a11y/noStaticElementInteractions: Overlay backdrop */}
			<div className="absolute inset-0" onClick={onClose} />
			<div className="relative flex w-full max-w-md flex-col gap-6 rounded-xl border border-financy-gray-200 bg-white p-6">
				{/* Header */}
				<div className="flex items-start justify-between gap-4">
					<div className="flex flex-1 flex-col gap-0.5">
						<h2
							id="modal-title"
							className="font-semibold text-financy-gray-800 text-lg"
						>
							Nova categoria
						</h2>
						<p className="text-financy-gray-600 text-sm">
							Organize suas transações com categorias
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

				{/* Form */}
				<form onSubmit={onSubmit} className="flex flex-col gap-4">
					<Input
						id="name"
						label="Título"
						placeholder="Ex. Alimentação"
						error={!!nameError}
						helper={nameError}
						{...form.register('name', createCategoryFormRules.name)}
					/>

					<div className="flex flex-col gap-2">
						<Input
							id="description"
							label="Descrição"
							placeholder="Descrição da categoria"
							{...form.register('description')}
						/>
						<span className="text-financy-gray-500 text-xs">Opcional</span>
					</div>

					<div className="flex flex-col gap-2">
						<span className="font-medium text-financy-gray-700 text-sm">
							Pré-visualização
						</span>
						<div className="flex items-center justify-center rounded-xl bg-financy-gray-100 p-4">
							<IconTile
								icon={previewIcon}
								color={selectedColor}
								aria-label="Pré-visualização da categoria"
							/>
						</div>
					</div>

					{/* Icon Picker */}
					<div className="flex flex-col gap-2">
						<span className="font-medium text-financy-gray-700 text-sm">
							Ícone
						</span>
						<div className="flex flex-wrap gap-2">
							{CATEGORY_ICONS.map(({ id, icon }) => (
								<button
									key={id}
									type="button"
									onClick={() => form.setValue('icon', id)}
									className={cn(
										'flex h-[42px] w-[42px] items-center justify-center rounded-lg border transition-colors',
										selectedIcon === id
											? 'border-financy-brand-base bg-financy-gray-100 text-financy-brand-base'
											: 'border-financy-gray-300 bg-white text-financy-gray-600 hover:border-financy-gray-400',
									)}
									aria-label={`Selecionar ícone ${id}`}
								>
									{icon}
								</button>
							))}
						</div>
					</div>

					{/* Color Picker */}
					<div className="flex flex-col gap-2">
						<span className="font-medium text-financy-gray-700 text-sm">
							Cor
						</span>
						<div className="flex gap-2">
							{CATEGORY_COLORS.map(({ id, bgClass }) => (
								<button
									key={id}
									type="button"
									onClick={() => form.setValue('color', id)}
									className={cn(
										'h-5 flex-1 rounded border-2 transition-all',
										bgClass,
										selectedColor === id
											? 'border-financy-gray-800 ring-2 ring-financy-gray-300'
											: 'border-transparent hover:border-financy-gray-300',
									)}
									aria-label={`Selecionar cor ${id}`}
								/>
							))}
						</div>
					</div>

					{/* API Error Banner */}
					{formError && (
						<div className="rounded-lg bg-red-50 px-4 py-3 text-red-700 text-sm">
							{formError}
						</div>
					)}

					{/* Submit Button */}
					<LabelButton
						type="submit"
						variant="default"
						size="md"
						className="w-full"
						loading={isSubmitting}
					>
						Salvar
					</LabelButton>
				</form>
			</div>
		</div>
	);
};
