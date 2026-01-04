import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const labelButtonVariants = cva(
	[
		'inline-flex items-center justify-center gap-2',
		'rounded-md font-medium transition-colors duration-200',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
		'disabled:pointer-events-none disabled:opacity-50',
	].join(' '),
	{
		variants: {
			variant: {
				filled: [
					'bg-financy-green-500 text-white',
					'hover:bg-financy-green-700',
					'focus-visible:ring-financy-green-500',
				].join(' '),
				outlined: [
					'bg-white text-financy-gray-700 border border-financy-gray-200',
					'hover:bg-financy-gray-600 hover:text-white hover:border-financy-gray-600',
					'focus-visible:ring-financy-gray-400',
				].join(' '),
			},
			size: {
				md: 'h-12 px-6 py-3 text-base',
				sm: 'h-10 px-4 py-2 text-sm',
			},
		},
		defaultVariants: {
			variant: 'filled',
			size: 'md',
		},
	},
);

export interface LabelButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof labelButtonVariants> {
	icon?: React.ReactNode;
}

const LabelButton = React.forwardRef<HTMLButtonElement, LabelButtonProps>(
	({ className, variant, size, icon, children, ...props }, ref) => {
		return (
			<button
				className={cn(labelButtonVariants({ variant, size }), className)}
				ref={ref}
				{...props}
			>
				{icon && (
					<span className="flex items-center justify-center shrink-0">
						{icon}
					</span>
				)}
				{children}
			</button>
		);
	},
);

LabelButton.displayName = 'LabelButton';

export { LabelButton, labelButtonVariants };
