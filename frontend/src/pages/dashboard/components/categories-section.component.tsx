import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_CATEGORIES } from '../transation.mock';
import { CategoryRow } from './category-row.component';

export const CategoriesSection = () => {
	return (
		<div className="flex-1 overflow-hidden rounded-xl border border-financy-gray-200 bg-white">
			<div className="flex items-center justify-between border-financy-gray-200 border-b px-6 py-5">
				<span className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
					Categorias
				</span>
				<Link
					to="/transactions"
					className="flex items-center gap-1 text-financy-brand-base text-sm"
				>
					Gerenciar
					<ChevronRight className="h-5 w-5" />
				</Link>
			</div>

			<div className="flex flex-col gap-5 p-6">
				{MOCK_CATEGORIES.map((cat) => (
					<CategoryRow
						key={cat.id}
						category={cat.category}
						categoryColor={cat.categoryColor}
						itemCount={cat.itemCount}
						amount={cat.amount}
					/>
				))}
			</div>
		</div>
	);
};
