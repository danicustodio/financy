import type { TagVariants } from '@/components/tag';
import { Tag } from '@/components/tag';

interface CategoryRowProps {
	category: string;
	categoryColor: NonNullable<TagVariants['color']>;
	itemCount: number;
	amount: string;
}

export const CategoryRow = ({
	category,
	categoryColor,
	itemCount,
	amount,
}: CategoryRowProps) => {
	return (
		<div className="flex items-center gap-1">
			<Tag color={categoryColor}>{category}</Tag>
			<span className="flex-1 text-sm text-financy-gray-600 text-right">
				{itemCount} {itemCount === 1 ? 'item' : 'itens'}
			</span>
			<span className="w-22 text-sm font-semibold text-financy-gray-800 text-right">
				{amount}
			</span>
		</div>
	);
};
