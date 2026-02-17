import { SectionCard } from '@/components/section-card';
import type { BadgeVariants } from '@/components/ui/badge';
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
		<SectionCard
			title="Categorias"
			linkTo="/categories"
			linkLabel="Gerenciar"
			className="flex-1"
			contentClassName="flex flex-col gap-5 p-6"
		>
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
		</SectionCard>
	);
};
