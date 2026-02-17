import { Badge, type BadgeVariants } from '@/components/ui/badge';
import { presentAmount } from '@/mappers/amount.mapper';

interface CategoryRowProps {
	category: {
		name: string;
		color: NonNullable<BadgeVariants['color']>;
	};
	itemCount: number;
	amount: number;
}

export const CategoryRow = ({
	category,
	itemCount,
	amount,
}: CategoryRowProps) => {
	return (
		<div className="flex items-center gap-1">
			<Badge color={category.color}>{category.name}</Badge>
			<span className="flex-1 text-right text-financy-gray-600 text-sm">
				{itemCount} {itemCount === 1 ? 'item' : 'itens'}
			</span>
			<span className="w-22 text-right font-semibold text-financy-gray-800 text-sm">
				{presentAmount(amount)}
			</span>
		</div>
	);
};
