import { cva, type VariantProps } from 'class-variance-authority';

export const iconButtonVariants = cva(
	'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				outline:
					'border border-financy-gray-300 bg-financy-white text-financy-gray-700 hover:bg-financy-gray-100',
				danger:
					'bg-financy-red-light text-financy-danger hover:bg-financy-red-base hover:text-white',
			},
			size: {
				sm: 'h-8 w-8 p-1.5',
				md: 'h-9 w-9 p-2',
			},
		},
		defaultVariants: {
			variant: 'outline',
			size: 'sm',
		},
	},
);

export type IconButtonVariants = VariantProps<typeof iconButtonVariants>;
