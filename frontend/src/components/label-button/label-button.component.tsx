import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LabelButtonProps } from './label-button.types';
import { buttonVariants, iconVariants } from './label-button.variants';

export const LabelButton = ({
	children,
	icon,
	loading,
	variant,
	size,
	className,
	disabled,
	...props
}: LabelButtonProps) => {
	const iconContent = loading ? <Loader2 className="animate-spin" /> : icon;

	return (
		<button
			className={cn(buttonVariants({ variant, size }), className)}
			disabled={disabled || loading}
			{...props}
		>
			{iconContent && (
				<span className={cn(iconVariants({ variant, size }))}>
					{iconContent}
				</span>
			)}
			{children}
		</button>
	);
};
