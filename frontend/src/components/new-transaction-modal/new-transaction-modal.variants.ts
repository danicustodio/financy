import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const transactionTypeButtonVariants = cva(
	'flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-sm transition-colors',
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
					'border border-financy-red-base bg-financy-gray-100 text-financy-gray-800',
			},
			{
				type: 'income',
				active: true,
				className:
					'border border-financy-green-base bg-financy-gray-100 text-financy-gray-800',
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
