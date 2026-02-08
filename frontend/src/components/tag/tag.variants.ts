import { cva, type VariantProps } from 'class-variance-authority';

export const tagVariants = cva(
	'inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium',
	{
		variants: {
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
			color: 'green',
		},
	},
);

export type TagVariants = VariantProps<typeof tagVariants>;
