import { cva, type VariantProps } from 'class-variance-authority';

export const paginationButtonVariants = cva(
	'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg font-medium text-sm transition-colors',
	{
		variants: {
			state: {
				default:
					'border border-financy-gray-300 bg-financy-white text-financy-gray-700 hover:bg-financy-gray-100',
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
