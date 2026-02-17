import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border border-transparent px-3 py-1 font-medium text-sm transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
				secondary:
					'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
				destructive:
					'bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
				outline:
					'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
				ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 [a&]:hover:underline',
			},
			color: {
				green: 'bg-financy-green-light text-financy-green-dark',
				blue: 'bg-financy-blue-light text-financy-blue-dark',
				purple: 'bg-financy-purple-light text-financy-purple-dark',
				orange: 'bg-financy-orange-light text-financy-orange-dark',
				pink: 'bg-financy-pink-light text-financy-pink-dark',
				yellow: 'bg-financy-yellow-light text-financy-yellow-dark',
				red: 'bg-financy-red-light text-financy-red-dark',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

type BadgeVariants = VariantProps<typeof badgeVariants>;

function Badge({
	className,
	variant = 'default',
	color,
	asChild = false,
	...props
}: React.ComponentProps<'span'> & BadgeVariants & { asChild?: boolean }) {
	const Comp = asChild ? Slot.Root : 'span';

	return (
		<Comp
			data-slot="badge"
			data-variant={variant}
			className={cn(
				badgeVariants({ variant: color ? undefined : variant, color }),
				className,
			)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
export type { BadgeVariants };
