import { LabelButton } from '@/components/label-button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog';

interface DeleteCategoryDialogProps {
	isOpen: boolean;
	categoryName: string;
	errorMessage?: string | null;
	isDeleting: boolean;
	onOpenChange: (open: boolean) => void;
	onCancel: () => void;
	onConfirm: () => void;
}

export const DeleteCategoryDialog = ({
	isOpen,
	categoryName,
	errorMessage,
	isDeleting,
	onOpenChange,
	onCancel,
	onConfirm,
}: DeleteCategoryDialogProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="rounded-xl border-financy-gray-200 p-6 sm:max-w-md">
				<div className="flex flex-col gap-2">
					<DialogTitle className="font-semibold text-base text-financy-gray-800">
						Excluir categoria
					</DialogTitle>
					<DialogDescription className="text-financy-gray-600 text-sm">
						Tem certeza que deseja excluir a categoria "{categoryName}"?
					</DialogDescription>
					{errorMessage != null && (
						<p className="text-financy-danger text-sm">{errorMessage}</p>
					)}
				</div>

				<DialogFooter className="mt-2">
					<LabelButton
						variant="outline"
						size="sm"
						type="button"
						onClick={onCancel}
						disabled={isDeleting}
					>
						Cancelar
					</LabelButton>
					<LabelButton
						variant="default"
						size="sm"
						type="button"
						onClick={onConfirm}
						loading={isDeleting}
						className="bg-financy-danger hover:bg-financy-red-base"
					>
						Excluir
					</LabelButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
