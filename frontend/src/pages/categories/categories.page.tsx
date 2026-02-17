import { ArrowUpDown, Plus, Tag } from 'lucide-react';
import { useMemo } from 'react';
import { CategoryCard } from '@/components/categories';
import { CreateCategoryModal } from '@/components/create-category-modal';
import { IconTile } from '@/components/icon-tile';
import { LabelButton } from '@/components/label-button';
import { useListCategories } from '@/hooks/queries/use-list-categories';
import { useListTransactions } from '@/hooks/queries/use-list-transactions';
import { toCategoryColor } from '@/mappers/listing.mapper';

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
		<main className="flex flex-col gap-8 p-12">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-0.5">
					<h1 className="font-bold text-2xl text-financy-gray-800">
						Categorias
					</h1>
					<p className="text-base text-financy-gray-600">
						Organize suas transações por categorias
					</p>
				</div>
				<CreateCategoryModal>
					<LabelButton
						variant="default"
						size="sm"
						icon={<Plus className="h-4 w-4" />}
					>
						Nova categoria
					</LabelButton>
				</CreateCategoryModal>
			</div>

			{/* Summary Cards */}
			<div className="flex gap-6">
				{/* Total Categories Card */}
				<div className="flex flex-1 gap-4 rounded-xl border border-financy-gray-200 bg-white p-6">
					<div className="flex h-8 w-8 items-center justify-center">
						<Tag className="h-6 w-6 text-financy-brand-base" />
					</div>
					<div className="flex flex-col gap-2">
						<span className="font-bold text-[28px] text-financy-gray-800">
							{totalCategories}
						</span>
						<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
							total de categorias
						</span>
					</div>
				</div>

				{/* Total Transactions Card */}
				<div className="flex flex-1 gap-4 rounded-xl border border-financy-gray-200 bg-white p-6">
					<div className="flex h-8 w-8 items-center justify-center">
						<ArrowUpDown className="h-6 w-6 text-financy-brand-base" />
					</div>
					<div className="flex flex-col gap-2">
						<span className="font-bold text-[28px] text-financy-gray-800">
							{totalTransactions}
						</span>
						<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
							total de transações
						</span>
					</div>
				</div>

				{/* Most Used Category Card */}
				<div className="flex flex-1 gap-4 rounded-xl border border-financy-gray-200 bg-white p-6">
					<IconTile
						icon={Tag}
						color={mostUsedCategory?.uiColor ?? 'blue'}
						className="h-8 w-8 rounded-full [&_svg]:h-5 [&_svg]:w-5"
						aria-label="Categoria mais utilizada"
					/>
					<div className="flex flex-col gap-2">
						<span className="font-bold text-[28px] text-financy-gray-800">
							{mostUsedCategory?.name ?? '-'}
						</span>
						<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
							categoria mais utilizada
						</span>
					</div>
				</div>
			</div>

			{/* Categories Grid */}
			{isLoading ? (
				<div className="rounded-xl border border-financy-gray-200 bg-white p-8 text-center text-financy-gray-600 text-sm">
					Carregando categorias...
				</div>
			) : (
				<div className="grid grid-cols-4 gap-6">
					{categoriesWithCount.map((category) => (
						<CategoryCard
							key={category.id}
							name={category.name}
							description={category.description ?? ''}
							color={category.uiColor}
							itemCount={category.itemCount}
						/>
					))}
				</div>
			)}
		</main>
	);
}
