import { SquarePen, Trash2 } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { Tag } from '@/components/tag';
import { cn } from '@/lib/utils';

export type CategoryColor =
	| 'blue'
	| 'purple'
	| 'yellow'
	| 'pink'
	| 'green'
	| 'orange'
	| 'red';

interface CategoryCardProps {
	name: string;
	description: string;
	color: CategoryColor;
	itemCount: number;
}

const categoryHeaderVariants: Record<CategoryColor, string> = {
	blue: 'bg-financy-blue-light',
	purple: 'bg-financy-purple-light',
	yellow: 'bg-financy-yellow-light',
	pink: 'bg-financy-pink-light',
	green: 'bg-financy-green-light',
	orange: 'bg-financy-orange-light',
	red: 'bg-financy-red-light',
};

export const CategoryCard = ({
	name,
	description,
	color,
	itemCount,
}: CategoryCardProps) => {
	const itemLabel = itemCount === 1 ? 'item' : 'itens';

	return (
		<div className="overflow-hidden rounded-xl border border-financy-gray-200 bg-white">
			{/* Header with colored background and action buttons */}
			<div
				className={cn(
					'flex items-center justify-between p-6',
					categoryHeaderVariants[color],
				)}
			>
				<div className="h-10 w-10 rounded-full bg-white/30" />
				<div className="flex items-center gap-2">
					<IconButton
						variant="outline"
						size="sm"
						icon={<SquarePen className="h-4 w-4" />}
					/>
					<IconButton
						variant="danger"
						size="sm"
						icon={<Trash2 className="h-4 w-4" />}
					/>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-5 p-6">
				{/* Text section */}
				<div className="flex flex-col gap-1">
					<h3 className="font-semibold text-base text-financy-gray-800">
						{name}
					</h3>
					<p className="line-clamp-2 h-10 text-financy-gray-600 text-sm">
						{description}
					</p>
				</div>

				{/* Tag and item count */}
				<div className="flex items-center justify-between">
					<Tag color={color}>{name}</Tag>
					<span className="text-financy-gray-600 text-sm">
						{itemCount} {itemLabel}
					</span>
				</div>
			</div>
		</div>
	);
};
