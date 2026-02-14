import { ArrowUpDown, Plus, Tag } from 'lucide-react';
import { useState } from 'react';
import { CategoryCard } from '@/components/categories';
import { LabelButton } from '@/components/label-button';
import { NewCategoryModal } from '@/components/new-category-modal';
import { MOCK_CATEGORIES } from './categories.mock';

export function Categories() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const totalCategories = MOCK_CATEGORIES.length;
	const totalTransactions = MOCK_CATEGORIES.reduce(
		(sum, cat) => sum + cat.itemCount,
		0,
	);
	const mostUsedCategory = MOCK_CATEGORIES.reduce((prev, current) =>
		current.itemCount > prev.itemCount ? current : prev,
	);

	return (
		<>
			<main className="p-12 flex flex-col gap-8">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-0.5">
						<h1 className="text-2xl font-bold text-financy-gray-800">
							Categorias
						</h1>
						<p className="text-base text-financy-gray-600">
							Organize suas transações por categorias
						</p>
					</div>
					<LabelButton
						variant="default"
						size="sm"
						icon={<Plus className="w-4 h-4" />}
						onClick={() => setIsModalOpen(true)}
					>
						Nova categoria
					</LabelButton>
				</div>

				{/* Summary Cards */}
				<div className="flex gap-6">
					{/* Total Categories Card */}
					<div className="flex gap-4 bg-white border border-financy-gray-200 rounded-xl p-6 flex-1">
						<div className="flex items-center justify-center w-8 h-8">
							<Tag className="w-6 h-6 text-financy-brand-base" />
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-[28px] font-bold text-financy-gray-800">
								{totalCategories}
							</span>
							<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
								total de categorias
							</span>
						</div>
					</div>

					{/* Total Transactions Card */}
					<div className="flex gap-4 bg-white border border-financy-gray-200 rounded-xl p-6 flex-1">
						<div className="flex items-center justify-center w-8 h-8">
							<ArrowUpDown className="w-6 h-6 text-financy-brand-base" />
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-[28px] font-bold text-financy-gray-800">
								{totalTransactions}
							</span>
							<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
								total de transações
							</span>
						</div>
					</div>

					{/* Most Used Category Card */}
					<div className="flex gap-4 bg-white border border-financy-gray-200 rounded-xl p-6 flex-1">
						<div
							className="flex items-center justify-center w-8 h-8 rounded-full"
							style={{ backgroundColor: mostUsedCategory.headerBgColor }}
						/>
						<div className="flex flex-col gap-2">
							<span className="text-[28px] font-bold text-financy-gray-800">
								{mostUsedCategory.name}
							</span>
							<span className="text-xs font-medium uppercase tracking-wider text-financy-gray-500">
								categoria mais utilizada
							</span>
						</div>
					</div>
				</div>

				{/* Categories Grid */}
				<div className="grid grid-cols-4 gap-6">
					{MOCK_CATEGORIES.map((category) => (
						<CategoryCard
							key={category.id}
							name={category.name}
							description={category.description}
							color={category.color}
							itemCount={category.itemCount}
							headerBgColor={category.headerBgColor}
						/>
					))}
				</div>
			</main>

			<NewCategoryModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={(data) => {
					console.log('New category:', data);
					setIsModalOpen(false);
				}}
			/>
		</>
	);
}
