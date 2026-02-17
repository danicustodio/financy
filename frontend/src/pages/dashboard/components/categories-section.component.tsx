import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BadgeVariants } from '@/components/ui/badge';
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { CategoryRow } from './category-row.component';

interface CategorySectionItem {
	id: string;
	category: {
		name: string;
		color: NonNullable<BadgeVariants['color']>;
	};
	itemCount: number;
	amount: number;
}

interface CategoriesSectionProps {
	categories: CategorySectionItem[];
}

export const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
	return (
		<Card className="flex-1 gap-0 overflow-hidden border-financy-gray-200 bg-white p-0 shadow-none">
			<CardHeader className="border-financy-gray-200 border-b px-6 py-5">
				<CardTitle className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
					Categorias
				</CardTitle>
				<CardAction>
					<Link
						to="/categories"
						className="flex items-center gap-1 text-financy-brand-base text-sm"
					>
						Gerenciar
						<ChevronRight className="h-5 w-5" />
					</Link>
				</CardAction>
			</CardHeader>

			<CardContent className="flex flex-col gap-5 p-6">
				{categories.length > 0 ? (
					categories.map((cat) => (
						<CategoryRow
							key={cat.id}
							category={cat.category}
							itemCount={cat.itemCount}
							amount={cat.amount}
						/>
					))
				) : (
					<p className="text-financy-gray-600 text-sm">
						Nenhuma categoria cadastrada.
					</p>
				)}
			</CardContent>
		</Card>
	);
};
