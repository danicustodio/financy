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
			<span className="flex-1 text-right text-financy-gray-600 text-sm">
				{itemCount} {itemCount === 1 ? 'item' : 'itens'}
			</span>
			<span className="w-22 text-right font-semibold text-financy-gray-800 text-sm">
				{amount}
			</span>
		</div>
	);
};
