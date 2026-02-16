import { ArrowUpDown, Plus, Tag } from 'lucide-react';
import { useState } from 'react';
import { CategoryCard } from '@/components/categories';
import { IconTile } from '@/components/icon-tile';
import { LabelButton } from '@/components/label-button';
import { NewCategoryModal } from '@/components/new-category-modal';
import { useCreateCategoryForm } from '@/features/categories/create-category';
import { MOCK_CATEGORIES } from './categories.mock';

export function Categories() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { form, formError, isSubmitting, onSubmit } = useCreateCategoryForm(
		() => {
			setIsModalOpen(false);
			form.reset();
		},
	);

	const handleCloseModal = () => {
		setIsModalOpen(false);
		form.reset();
	};

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
					<LabelButton
						variant="default"
						size="sm"
						icon={<Plus className="h-4 w-4" />}
						onClick={() => setIsModalOpen(true)}
					>
						Nova categoria
					</LabelButton>
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
							color={mostUsedCategory.color}
							className="h-8 w-8 rounded-full [&_svg]:h-5 [&_svg]:w-5"
							aria-label={`Ícone da categoria ${mostUsedCategory.name}`}
						/>
						<div className="flex flex-col gap-2">
							<span className="font-bold text-[28px] text-financy-gray-800">
								{mostUsedCategory.name}
							</span>
							<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
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
						/>
					))}
				</div>
			</main>

			<NewCategoryModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				form={form}
				formError={formError}
				isSubmitting={isSubmitting}
				onSubmit={onSubmit}
			/>
		</>
	);
}
