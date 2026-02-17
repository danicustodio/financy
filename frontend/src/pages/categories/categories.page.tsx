import { ArrowUpDown, Plus, Tag } from 'lucide-react';
import { useMemo } from 'react';
import { LabelButton } from '@/components/label-button';
import { PageHeader } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { useListCategories } from '@/hooks/queries/use-list-categories';
import { useListTransactions } from '@/hooks/queries/use-list-transactions';
import { toCategoryColor } from '@/mappers/api-to-domain/category.api-to-domain.mapper';
import { toCategoryIcon } from '@/mappers/domain-to-view/transaction.domain-to-view.mapper';
import { CategoryCard } from './components/category-card.component';
import { CategorySummaryCard } from './components/category-summary-card.component';
import { CreateCategoryModal } from './components/create-category-modal.component';

export function Categories() {
	const { data: categories = [], isLoading } = useListCategories();
	const { data: transactions = [] } = useListTransactions();

	const categoryCountById = useMemo(() => {
		return transactions.reduce<Record<string, number>>((acc, transaction) => {
			acc[transaction.category.id] = (acc[transaction.category.id] ?? 0) + 1;
			return acc;
		}, {});
	}, [transactions]);

	const categoriesWithCount = useMemo(
		() =>
			categories.map((category) => ({
				...category,
				itemCount: categoryCountById[category.id] ?? 0,
				uiColor: toCategoryColor(category.color),
				uiIcon: toCategoryIcon(category.icon),
			})),
		[categories, categoryCountById],
	);

	const totalCategories = categoriesWithCount.length;
	const totalTransactions = categoriesWithCount.reduce(
		(sum, category) => sum + category.itemCount,
		0,
	);

	const mostUsedCategory = useMemo(
		() =>
			categoriesWithCount.reduce<(typeof categoriesWithCount)[number] | null>(
				(prev, current) => {
					if (!prev || current.itemCount > prev.itemCount) {
						return current;
					}

					return prev;
				},
				null,
			),
		[categoriesWithCount],
	);

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
					icon={mostUsedCategory?.uiIcon ?? Tag}
					value={mostUsedCategory?.title ?? '-'}
					label="categoria mais utilizada"
					accentClassName={mostUsedCategory?.color} // TODO: get the category color
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
					{categoriesWithCount.map((category) => (
						<CategoryCard
							key={category.id}
							name={category.title}
							description={category.description ?? ''}
							icon={category.uiIcon}
							color={category.uiColor}
							itemCount={category.itemCount}
						/>
					))}
				</div>
			)}
		</main>
	);
}
