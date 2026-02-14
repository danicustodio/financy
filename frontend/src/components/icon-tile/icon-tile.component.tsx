import { cn } from '@/lib/utils';
import type { IconTileProps } from './icon-tile.types';
import { iconTileVariants } from './icon-tile.variants';

export const IconTile = ({
	icon: Icon,
	color,
	className,
	...props
}: IconTileProps) => {
	return (
		<div className={cn(iconTileVariants({ color }), className)} {...props}>
			<span className="flex items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
				<Icon />
			</span>
		</div>
	);
};
