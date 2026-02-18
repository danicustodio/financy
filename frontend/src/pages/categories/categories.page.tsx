import { ArrowUpDown, Plus, Tag } from 'lucide-react';
import { LabelButton } from '@/components/label-button';
import { PageHeader } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { TEXT_CLASS_BY_CATEGORY_COLOR } from '@/constants/category';
import { useCategoriesSummary } from '@/hooks/queries/use-categories-summary';
import { useListCategories } from '@/hooks/queries/use-list-categories';
import { toCategoryIcon } from '@/mappers/domain-to-view/transaction.domain-to-view.mapper';
import { CategoryCard } from './components/category-card.component';
import { CategorySummaryCard } from './components/category-summary-card.component';
import { CreateCategoryModal } from './components/create-category-modal.component';

export function Categories() {
	const { data: categories = [], isLoading } = useListCategories();
	const { data: summary } = useCategoriesSummary();

	const totalCategories = summary?.totalCategories ?? 0;
	const totalTransactions = summary?.totalTransactions ?? 0;
	const mostUsedCategory = summary?.mostUsedCategory ?? null;

	return (
		<main className="m-auto flex max-w-7xl flex-col gap-8 p-12">
			<PageHeader
				title="Categorias"
				subtitle="Organize suas transações por categorias"
				action={
					<CreateCategoryModal>
						<LabelButton
							variant="default"
							size="sm"
							icon={<Plus className="h-4 w-4" />}
						>
							Nova categoria
						</LabelButton>
					</CreateCategoryModal>
				}
			/>

			<div className="flex gap-6">
				<CategorySummaryCard
					icon={Tag}
					value={totalCategories}
					label="total de categorias"
					accentClassName="text-financy-gray-700"
				/>

				<CategorySummaryCard
					icon={ArrowUpDown}
					value={totalTransactions}
					label="total de transações"
					accentClassName="text-financy-purple-base"
				/>

				<CategorySummaryCard
					icon={
						mostUsedCategory != null
							? toCategoryIcon(mostUsedCategory.icon)
							: Tag
					}
					value={mostUsedCategory?.title ?? '-'}
					label="categoria mais utilizada"
					accentClassName={
						mostUsedCategory != null
							? TEXT_CLASS_BY_CATEGORY_COLOR[mostUsedCategory.color]
							: undefined
					}
				/>
			</div>

			{isLoading ? (
				<div className="grid grid-cols-4 gap-6">
					{['a', 'b', 'c', 'd'].map((id) => (
						<Skeleton key={id} className="h-70 rounded-xl" />
					))}
				</div>
			) : (
				<div className="grid grid-cols-4 gap-4">
					{categories.map((category) => (
						<CategoryCard
							key={category.id}
							id={category.id}
							name={category.title}
							description={category.description ?? ''}
							icon={toCategoryIcon(category.icon)}
							color={category.color}
							itemCount={category.transactionCount}
						/>
					))}
				</div>
			)}
		</main>
	);
}
