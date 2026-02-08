import type { TagVariants } from './tag.variants';

export interface TagProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		TagVariants {
	children: React.ReactNode;
}
