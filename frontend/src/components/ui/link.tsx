import { cva, type VariantProps } from 'class-variance-authority';
import { type AnchorHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const linkVariants = cva(
	[
		'inline-flex items-center font-medium transition-all duration-200',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-financy-brand-base',
		'hover:underline hover:underline-offset-2',
	].join(' '),
	{
		variants: {
			variant: {
				default: 'text-financy-brand-base decoration-financy-brand-base',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface LinkProps
	extends AnchorHTMLAttributes<HTMLAnchorElement>,
		VariantProps<typeof linkVariants> {}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	({ className, variant, children, ...props }, ref) => {
		return (
			<a
				className={cn(linkVariants({ variant }), className)}
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
