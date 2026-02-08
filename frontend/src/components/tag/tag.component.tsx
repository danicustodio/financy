import { cn } from '@/lib/utils';
import type { TagProps } from './tag.types';
import { tagVariants } from './tag.variants';

export const Tag = ({ children, color, className, ...props }: TagProps) => {
	return (
		<span className={cn(tagVariants({ color }), className)} {...props}>
			{children}
		</span>
	);
};
