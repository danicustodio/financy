import type { LucideIcon } from 'lucide-react';
import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { IconButton } from '@/components/icon-button';
import { IconTile } from '@/components/icon-tile';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useDeleteCategoryMutation } from '@/hooks/mutations/use-delete-category-mutation';
import { mapGraphQLError } from '@/mappers/errors/graphql-error.mapper';
import {
	DELETE_CATEGORY_ERROR_FALLBACK,
	DELETE_CATEGORY_ERROR_RULES,
} from '@/mappers/errors/graphql-error-rules';
import type {
	Category,
	CategoryColor,
	CategoryIconName,
} from '@/types/domain/category';
import { DeleteCategoryDialog } from './delete-category-dialog.component';
import { EditCategoryModal } from './edit-category-modal.component';

interface CategoryCardProps {
	id: string;
	name: string;
	description: string;
	iconName: CategoryIconName;
	icon: LucideIcon;
	color: CategoryColor;
	itemCount: number;
}

export const CategoryCard = ({
	id,
	name,
	description,
	iconName,
	icon,
	color,
	itemCount,
}: CategoryCardProps) => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [deleteError, setDeleteError] = useState<string | null>(null);
	const deleteCategoryMutation = useDeleteCategoryMutation();

	const itemLabel = itemCount === 1 ? 'item' : 'itens';

	const openDeleteDialog = () => {
		setDeleteError(null);
		setIsDeleteDialogOpen(true);
	};

	const handleDelete = async () => {
		setDeleteError(null);

		try {
			await deleteCategoryMutation.mutateAsync({ id });
			setIsDeleteDialogOpen(false);
		} catch (error) {
			setDeleteError(
				mapGraphQLError(
					error,
					DELETE_CATEGORY_ERROR_FALLBACK,
					DELETE_CATEGORY_ERROR_RULES,
				),
			);
		}
	};

	return (
		<>
			<Card className="gap-0 overflow-hidden border-financy-gray-200 p-0 shadow-none">
				<div className="flex items-center justify-between p-6 pb-0">
					<IconTile icon={icon} color={color} />

					<div className="flex items-center gap-2">
						<IconButton
							variant="outline"
							aria-label="Excluir categoria"
							icon={<Trash2 className="h-4 w-4 text-financy-danger" />}
							onClick={openDeleteDialog}
							disabled={deleteCategoryMutation.isPending}
						/>

						<IconButton
							variant="outline"
							aria-label="Editar categoria"
							icon={<SquarePen className="h-4 w-4 text-financy-gray-700" />}
							onClick={() => setIsEditDialogOpen(true)}
							disabled={deleteCategoryMutation.isPending}
						/>
					</div>
				</div>

				<CardContent className="flex flex-col gap-5 p-6">
					<div className="flex flex-col gap-1">
						<h3 className="font-semibold text-base text-financy-gray-800">
							{name}
						</h3>
						<p className="line-clamp-2 h-10 text-financy-gray-600 text-sm">
							{description}
						</p>
					</div>

					<div className="flex items-center justify-between">
						<Badge color={color}>{name}</Badge>
						<span className="text-financy-gray-600 text-sm">
							{itemCount} {itemLabel}
						</span>
					</div>
				</CardContent>
			</Card>

			<DeleteCategoryDialog
				isOpen={isDeleteDialogOpen}
				categoryName={name}
				errorMessage={deleteError}
				isDeleting={deleteCategoryMutation.isPending}
				onOpenChange={setIsDeleteDialogOpen}
				onCancel={() => setIsDeleteDialogOpen(false)}
				onConfirm={handleDelete}
			/>

			<EditCategoryModal
				category={
					{
						id,
						title: name,
						description,
						icon: iconName,
						color,
						transactionCount: itemCount,
					} satisfies Category
				}
				isOpen={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
			/>
		</>
	);
};
