import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CreateTransactionModal } from '@/components/create-transaction-modal';
import { LabelButton } from '@/components/label-button';
import { PageHeader } from '@/components/page-header';
import { useDeleteTransactionMutation } from '@/hooks/mutations/use-delete-transaction-mutation';
import { useListCategories } from '@/hooks/queries/use-list-categories';
import { useListTransactions } from '@/hooks/queries/use-list-transactions';
import { toTransactionRowView } from '@/mappers/domain-to-view/transaction.domain-to-view.mapper';
import { mapGraphQLError } from '@/mappers/errors/graphql-error.mapper';
import {
	DELETE_TRANSACTION_ERROR_FALLBACK,
	DELETE_TRANSACTION_ERROR_RULES,
} from '@/mappers/errors/graphql-error-rules';
import { DeleteTransactionDialog } from './components/delete-transaction-dialog.component';
import { EditTransactionModal } from './components/edit-transaction-modal.component';
import { TransactionsFilterBar } from './components/transactions-filter-bar.component';
import { TransactionsTable } from './components/transactions-table.component';

const PAGE_SIZE = 10;

function parsePeriod(period: string): { month: number; year: number } | null {
	if (!period || period === 'all') return null;
	const [year, month] = period.split('-').map(Number);
	if (!year || !month) return null;
	return { month, year };
}

export function Transactions() {
	const [search, setSearch] = useState('');
	const [type, setType] = useState('all');
	const [categoryId, setCategoryId] = useState('all');
	const [period, setPeriod] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);

	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [selectedTransactionId, setSelectedTransactionId] = useState<
		string | null
	>(null);
	const [selectedTransactionDescription, setSelectedTransactionDescription] =
		useState('');
	const [deleteError, setDeleteError] = useState<string | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedTransactionIdForEdit, setSelectedTransactionIdForEdit] =
		useState<string | null>(null);

	const parsed = parsePeriod(period);

	const filter = {
		...(search.trim() !== '' && { search: search.trim() }),
		...(type !== 'all' && { type }),
		...(categoryId !== 'all' && { categoryId }),
		...(parsed && { month: parsed.month, year: parsed.year }),
	};

	const { data, isLoading } = useListTransactions({
		filter,
		pagination: { page: currentPage, pageSize: PAGE_SIZE },
	});

	const { data: categories = [] } = useListCategories();

	const deleteTransactionMutation = useDeleteTransactionMutation();

	const totalCount = data?.totalCount ?? 0;
	const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
	const tableRows = useMemo(
		() => (data?.items ?? []).map(toTransactionRowView),
		[data],
	);
	const selectedTransactionForEdit =
		data?.items.find(
			(transaction) => transaction.id === selectedTransactionIdForEdit,
		) ?? null;

	function handleFilterChange(updater: () => void) {
		updater();
		setCurrentPage(1);
	}

	function openDeleteDialog(id: string) {
		const transaction = tableRows.find((row) => row.id === id);
		setDeleteError(null);
		setSelectedTransactionId(id);
		setSelectedTransactionDescription(transaction?.description ?? '');
		setIsDeleteDialogOpen(true);
	}

	function openEditModal(id: string) {
		setSelectedTransactionIdForEdit(id);
		setIsEditModalOpen(true);
	}

	async function handleDeleteConfirm() {
		if (!selectedTransactionId) return;
		setDeleteError(null);

		try {
			await deleteTransactionMutation.mutateAsync({
				id: selectedTransactionId,
			});
			setIsDeleteDialogOpen(false);
		} catch (error) {
			setDeleteError(
				mapGraphQLError(
					error,
					DELETE_TRANSACTION_ERROR_FALLBACK,
					DELETE_TRANSACTION_ERROR_RULES,
				),
			);
		}
	}

	return (
		<main className="m-auto flex max-w-7xl flex-col gap-8 p-12">
			<PageHeader
				title="Transações"
				subtitle="Gerencie todas as suas transações financeiras"
				action={
					<CreateTransactionModal>
						<LabelButton
							variant="default"
							size="sm"
							icon={<Plus className="h-4 w-4" />}
						>
							Nova transação
						</LabelButton>
					</CreateTransactionModal>
				}
			/>

			<TransactionsFilterBar
				search={search}
				onSearchChange={(value) => handleFilterChange(() => setSearch(value))}
				type={type}
				onTypeChange={(value) => handleFilterChange(() => setType(value))}
				categoryId={categoryId}
				onCategoryIdChange={(value) =>
					handleFilterChange(() => setCategoryId(value))
				}
				period={period}
				onPeriodChange={(value) => handleFilterChange(() => setPeriod(value))}
				categories={categories}
			/>

			{isLoading ? (
				<div className="rounded-xl border border-financy-gray-200 bg-white p-8 text-center text-financy-gray-600 text-sm">
					Carregando transações...
				</div>
			) : (
				<TransactionsTable
					transactions={tableRows}
					currentPage={currentPage}
					totalPages={totalPages}
					totalResults={totalCount}
					pageSize={PAGE_SIZE}
					isDeleting={deleteTransactionMutation.isPending}
					onPageChange={setCurrentPage}
					onEdit={openEditModal}
					onDelete={openDeleteDialog}
				/>
			)}

			<DeleteTransactionDialog
				isOpen={isDeleteDialogOpen}
				description={selectedTransactionDescription}
				errorMessage={deleteError}
				isDeleting={deleteTransactionMutation.isPending}
				onOpenChange={setIsDeleteDialogOpen}
				onCancel={() => setIsDeleteDialogOpen(false)}
				onConfirm={handleDeleteConfirm}
			/>

			<EditTransactionModal
				transaction={selectedTransactionForEdit}
				isOpen={isEditModalOpen}
				onOpenChange={(open) => {
					setIsEditModalOpen(open);
					if (!open) {
						setSelectedTransactionIdForEdit(null);
					}
				}}
			/>
		</main>
	);
}
