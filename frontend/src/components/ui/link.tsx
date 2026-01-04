import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const linkVariants = cva(
	[
		'inline-flex items-center font-medium transition-all duration-200',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-financy-green-500',
		'hover:underline hover:underline-offset-2',
	].join(' '),
	{
		variants: {
			variant: {
				default: 'text-financy-green-500 hover:text-financy-green-700',
				muted: 'text-financy-gray-400 hover:text-financy-gray-300',
			},
			size: {
				default: 'text-base',
				sm: 'text-sm',
				lg: 'text-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface LinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
		VariantProps<typeof linkVariants> {}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	({ className, variant, size, children, ...props }, ref) => {
		return (
			<a
				className={cn(linkVariants({ variant, size }), className)}
				ref={ref}
				{...props}
			>
				{children}
			</a>
		);
	},
);

Link.displayName = 'Link';

export { Link, linkVariants };
