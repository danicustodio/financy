import { cva, type VariantProps } from 'class-variance-authority';

export const paginationButtonVariants = cva(
	'inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors cursor-pointer',
	{
		variants: {
			state: {
				default:
					'bg-financy-white border border-financy-gray-300 text-financy-gray-700 hover:bg-financy-gray-100',
				active: 'bg-financy-brand-base text-white',
			},
		},
		defaultVariants: {
			state: 'default',
		},
	},
);

export type PaginationButtonVariants = VariantProps<
	typeof paginationButtonVariants
>;
