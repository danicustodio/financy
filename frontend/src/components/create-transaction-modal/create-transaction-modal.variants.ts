import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const transactionTypeGroupVariants = cva(
	'flex w-full rounded-xl border border-financy-gray-200 bg-transparent p-2',
);

export const transactionTypeItemVariants = cva(
	'h-11.5 flex-1 cursor-pointer rounded-lg border border-transparent bg-transparent font-medium text-base text-financy-gray-600 [&>svg]:text-financy-gray-400',
	{
		variants: {
			type: {
				expense:
					'data-[state=on]:border-financy-red-base data-[state=on]:bg-financy-gray-100 data-[state=on]:text-financy-gray-800 [&[data-state=on]>svg]:text-financy-red-base',
				income:
					'data-[state=on]:border-financy-green-base data-[state=on]:bg-financy-gray-100 data-[state=on]:text-financy-gray-800 [&[data-state=on]>svg]:text-financy-green-base',
			},
		},
		defaultVariants: {
			type: 'expense',
		},
	},
);

export type TransactionTypeItemVariants = VariantProps<
	typeof transactionTypeItemVariants
>;
