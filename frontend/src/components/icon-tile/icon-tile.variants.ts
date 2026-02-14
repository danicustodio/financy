import { cva, type VariantProps } from 'class-variance-authority';

export const iconTileVariants = cva(
	'flex h-10 w-10 items-center justify-center rounded-sm',
	{
		variants: {
			color: {
				green: 'bg-financy-green-light text-financy-green-base',
				blue: 'bg-financy-blue-light text-financy-blue-base',
				purple: 'bg-financy-purple-light text-financy-purple-base',
				orange: 'bg-financy-orange-light text-financy-orange-base',
				pink: 'bg-financy-pink-light text-financy-pink-base',
				yellow: 'bg-financy-yellow-light text-financy-yellow-base',
				red: 'bg-financy-red-light text-financy-red-base',
			},
		},
		defaultVariants: {
			color: 'green',
		},
	},
);

export type IconTileVariants = VariantProps<typeof iconTileVariants>;
export type IconTileColor = NonNullable<IconTileVariants['color']>;
