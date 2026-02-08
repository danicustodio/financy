import type { TagVariants } from './tag.variants';

export interface TagProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
		TagVariants {
	children: React.ReactNode;
}
