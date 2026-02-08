import { ArrowUpDown, Plus, Tag } from 'lucide-react';
import { useState } from 'react';
import { CategoryCard, type CategoryColor } from '@/components/categories';
import { LabelButton } from '@/components/label-button';
import { Navbar } from '@/components/navbar';
import { NewCategoryModal } from '@/components/new-category-modal';

// Sample data for categories
const categories: {
	id: number;
	name: string;
	description: string;
	color: CategoryColor;
	itemCount: number;
	headerBgColor: string;
}[] = [
	{
		id: 1,
		name: 'Alimentação',
		description: 'Restaurantes, delivery e refeições',
		color: 'blue',
		itemCount: 12,
		headerBgColor: '#DBEAFE',
	},
	{
		id: 2,
		name: 'Transporte',
		description: 'Gasolina, transporte público e viagens',
		color: 'purple',
		itemCount: 8,
		headerBgColor: '#F3E8FF',
	},
	{
		id: 3,
		name: 'Utilidades',
		description: 'Energia, água, internet e telefone',
		color: 'yellow',
		itemCount: 7,
		headerBgColor: '#F7F3CA',
	},
	{
		id: 4,
		name: 'Entretenimento',
		description: 'Cinema, jogos e lazer',
		color: 'pink',
		itemCount: 2,
		headerBgColor: '#FCE7F3',
	},
	{
		id: 5,
		name: 'Investimento',
		description: 'Aplicações e retornos financeiros',
		color: 'green',
		itemCount: 1,
		headerBgColor: '#E0FAE9',
	},
	{
		id: 6,
		name: 'Mercado',
		description: 'Compras de supermercado e mantimentos',
		color: 'orange',
		itemCount: 3,
		headerBgColor: '#FFEDD5',
	},
	{
		id: 7,
		name: 'Salário',
		description: 'Renda mensal e bonificações',
		color: 'green',
		itemCount: 3,
		headerBgColor: '#E0FAE9',
	},
	{
		id: 8,
		name: 'Saúde',
		description: 'Medicamentos, consultas e exames',
		color: 'red',
		itemCount: 0,
		headerBgColor: '#FEE2E2',
	},
];

export function CategoriesPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const totalCategories = categories.length;
	const totalTransactions = categories.reduce(
		(sum, cat) => sum + cat.itemCount,
		0,
	);
	const mostUsedCategory = categories.reduce((prev, current) =>
		current.itemCount > prev.itemCount ? current : prev,
	);

	return (
		<div className="min-h-screen bg-financy-gray-100">
			<Navbar />

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
					{categories.map((category) => (
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
		</div>
	);
}
