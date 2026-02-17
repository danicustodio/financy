import { CheckIcon, ChevronDown } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface CategoryOption {
	id: string;
	name: string;
}

export interface CategoriesSelectionProps {
	categories: CategoryOption[];
	selectedCategoryId?: string;
	isLoading?: boolean;
	errorMessage?: string;
	onSelect: (categoryId: string) => void;
}

export const CategoriesSelection = ({
	categories,
	selectedCategoryId,
	isLoading = false,
	errorMessage,
	onSelect,
}: CategoriesSelectionProps) => {
	const selectedCategory = categories.find(
		(category) => category.id === selectedCategoryId,
	);

	return (
		<div className="flex flex-col gap-2">
			<label
				htmlFor="category"
				className="font-medium text-financy-gray-800 text-sm"
			>
				Categoria
			</label>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						id="category"
						className="flex w-full items-center justify-between rounded-md border border-financy-gray-300 bg-financy-white p-3 py-3.5 text-left text-sm"
					>
						<span
							className={
								selectedCategory
									? 'text-financy-gray-800'
									: 'text-financy-gray-400'
							}
						>
							{selectedCategory?.name ??
								(isLoading ? 'Carregando...' : 'Selecione')}
						</span>
						<ChevronDown size={16} className="text-financy-gray-500" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					side="bottom"
					align="start"
					className="w-(--radix-dropdown-menu-trigger-width)"
				>
					{categories.map((category) => (
						<DropdownMenuItem
							key={category.id}
							onSelect={() => onSelect(category.id)}
							className="flex items-center justify-between px-3 py-2.5"
						>
							{category.name}
							{selectedCategoryId === category.id && (
								<CheckIcon size={16} className="text-financy-brand-base" />
							)}
						</DropdownMenuItem>
					))}
					{!isLoading && categories.length === 0 && (
						<DropdownMenuItem
							disabled
							className="px-3 py-2.5 text-financy-gray-500"
						>
							Nenhuma categoria disponível
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			{errorMessage && (
				<p className="text-financy-gray-500 text-xs">{errorMessage}</p>
			)}
		</div>
	);
};
