import { cn } from '@/lib/utils';
import type { IconButtonProps } from './icon-button.types';
import { iconButtonVariants } from './icon-button.variants';

export const IconButton = ({
	icon,
	variant,
	size,
	className,
	...props
}: IconButtonProps) => {
	return (
		<button
			className={cn(iconButtonVariants({ variant, size }), className)}
			{...props}
		>
			{icon}
		</button>
	);
};
