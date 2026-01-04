import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const iconButtonVariants = cva(
	[
		'inline-flex items-center justify-center',
		'rounded-lg border transition-colors duration-200',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
		'disabled:pointer-events-none disabled:opacity-50',
	].join(' '),
	{
		variants: {
			variant: {
				default: [
					'border-financy-gray-200 text-financy-gray-400 bg-white',
					'hover:bg-financy-gray-100 hover:border-financy-gray-300',
					'focus-visible:ring-financy-gray-400',
				].join(' '),
				danger: [
					'border-financy-red-300 text-financy-red-300 bg-white',
					'hover:bg-red-50 hover:border-financy-red-500 hover:text-financy-red-500',
					'focus-visible:ring-financy-red-300',
				].join(' '),
			},
			size: {
				md: 'h-10 w-10',
				sm: 'h-8 w-8',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

export interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof iconButtonVariants> {
	icon: React.ReactNode;
	'aria-label': string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
	({ className, variant, size, icon, ...props }, ref) => {
		return (
			<button
				className={cn(iconButtonVariants({ variant, size }), className)}
				ref={ref}
				{...props}
			>
				<span className="flex items-center justify-center">{icon}</span>
			</button>
		);
	},
);

IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants };
