import { cva, type VariantProps } from 'class-variance-authority';

export const iconButtonVariants = cva(
	'inline-flex items-center justify-center gap-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
	{
		variants: {
			variant: {
				outline:
					'bg-financy-white border border-financy-gray-300 text-financy-gray-700 hover:bg-financy-gray-100',
				danger:
					'bg-financy-red-light text-financy-danger hover:bg-financy-red-base hover:text-white',
			},
			size: {
				sm: 'w-8 h-8 p-1.5',
				md: 'w-9 h-9 p-2',
			},
		},
		defaultVariants: {
			variant: 'outline',
			size: 'sm',
		},
	},
);

export type IconButtonVariants = VariantProps<typeof iconButtonVariants>;
