import { CheckIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/types/domain/category';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export interface CategoriesSelectionProps {
	categories: Pick<Category, 'id' | 'title'>[];
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
				className={cn(
					'font-medium text-sm',
					errorMessage ? 'text-financy-danger' : 'text-financy-gray-800',
				)}
			>
				Categoria
			</label>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						id="category"
						className={cn(
							'flex w-full items-center justify-between rounded-md border bg-financy-white p-3 py-3.5 text-left text-sm',
							errorMessage
								? 'border-financy-danger'
								: 'border-financy-gray-300',
						)}
					>
						<span
							className={
								selectedCategory
									? 'text-financy-gray-800'
									: 'text-financy-gray-400'
							}
						>
							{selectedCategory?.title ??
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
							{category.title}
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
				<p className="text-financy-danger text-xs">{errorMessage}</p>
			)}
		</div>
	);
};
