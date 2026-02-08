import { SquarePen, Trash2 } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { Tag } from '@/components/tag';

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
	headerBgColor: string;
}

export const CategoryCard = ({
	name,
	description,
	color,
	itemCount,
	headerBgColor,
}: CategoryCardProps) => {
	const itemLabel = itemCount === 1 ? 'item' : 'itens';

	return (
		<div className="bg-white border border-financy-gray-200 rounded-xl overflow-hidden">
			{/* Header with colored background and action buttons */}
			<div
				className="flex items-center justify-between p-6"
				style={{ backgroundColor: headerBgColor }}
			>
				<div className="w-10 h-10 rounded-full bg-white/30" />
				<div className="flex items-center gap-2">
					<IconButton
						variant="outline"
						size="sm"
						icon={<SquarePen className="w-4 h-4" />}
					/>
					<IconButton
						variant="danger"
						size="sm"
						icon={<Trash2 className="w-4 h-4" />}
					/>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-5 p-6">
				{/* Text section */}
				<div className="flex flex-col gap-1">
					<h3 className="text-base font-semibold text-financy-gray-800">
						{name}
					</h3>
					<p className="text-sm text-financy-gray-600 line-clamp-2 h-10">
						{description}
					</p>
				</div>

				{/* Tag and item count */}
				<div className="flex items-center justify-between">
					<Tag color={color}>{name}</Tag>
					<span className="text-sm text-financy-gray-600">
						{itemCount} {itemLabel}
					</span>
				</div>
			</div>
		</div>
	);
};
