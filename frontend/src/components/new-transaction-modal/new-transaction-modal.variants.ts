import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const transactionTypeButtonVariants = cva(
	'flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm cursor-pointer transition-colors flex-1',
	{
		variants: {
			type: {
				expense: '',
				income: '',
			},
			active: {
				true: '',
				false: 'text-financy-gray-600',
			},
		},
		compoundVariants: [
			{
				type: 'expense',
				active: true,
				className:
					'bg-financy-gray-100 border border-financy-red-base text-financy-gray-800',
			},
			{
				type: 'income',
				active: true,
				className:
					'bg-financy-gray-100 border border-financy-green-base text-financy-gray-800',
			},
			{
				type: 'expense',
				active: false,
				className: 'border border-transparent',
			},
			{
				type: 'income',
				active: false,
				className: 'border border-transparent',
			},
		],
		defaultVariants: {
			type: 'expense',
			active: false,
		},
	},
);

export type TransactionTypeButtonVariants = VariantProps<
	typeof transactionTypeButtonVariants
>;
