import { cva, type VariantProps } from 'class-variance-authority';

export const typeTagVariants = cva(
	'inline-flex items-center gap-2 font-medium text-sm',
	{
		variants: {
			type: {
				income: 'text-financy-green-dark',
				expense: 'text-financy-red-dark',
			},
		},
		defaultVariants: {
			type: 'expense',
		},
	},
);

export type TypeTagVariants = VariantProps<typeof typeTagVariants>;
