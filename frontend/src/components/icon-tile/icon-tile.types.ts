import type { LucideIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import type { IconTileVariants } from './icon-tile.variants';

export interface IconTileProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		IconTileVariants {
	icon: LucideIcon;
}
