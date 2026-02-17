import type { LucideIcon } from 'lucide-react';
import { SquarePen, Trash2 } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { IconTile } from '@/components/icon-tile';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
	icon: LucideIcon;
	color: CategoryColor;
	itemCount: number;
}

export const CategoryCard = ({
	name,
	description,
	icon,
	color,
	itemCount,
}: CategoryCardProps) => {
	const itemLabel = itemCount === 1 ? 'item' : 'itens';

	return (
		<Card className="gap-0 overflow-hidden border-financy-gray-200 p-0 shadow-none">
			<div className="flex items-center justify-between p-6 pb-0">
				<IconTile icon={icon} color={color} />

				<div className="flex items-center gap-2">
					<IconButton
						variant="outline"
						aria-label="Excluir categoria"
						icon={<Trash2 className="h-4 w-4 text-financy-danger" />}
					/>

					<IconButton
						variant="outline"
						aria-label="Editar categoria"
						icon={<SquarePen className="h-4 w-4 text-financy-gray-700" />}
					/>
				</div>
			</div>

			<CardContent className="flex flex-col gap-5 p-6">
				<div className="flex flex-col gap-1">
					<h3 className="font-semibold text-base text-financy-gray-800">
						{name}
					</h3>
					<p className="line-clamp-2 h-10 text-financy-gray-600 text-sm">
						{description}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<Badge color={color}>{name}</Badge>
					<span className="text-financy-gray-600 text-sm">
						{itemCount} {itemLabel}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
