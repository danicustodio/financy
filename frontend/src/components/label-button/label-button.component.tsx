import { cn } from '@/lib/utils';
import type { LabelButtonProps } from './label-button.types';
import { buttonVariants, iconVariants } from './label-button.variants';

export const LabelButton = ({
	children,
	icon,
	variant,
	size,
	className,
	...props
}: LabelButtonProps) => {
	return (
		<button
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		>
			{icon && (
				<span className={cn(iconVariants({ variant, size }))}>{icon}</span>
			)}
			{children}
		</button>
	);
};
