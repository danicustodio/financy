import { cva } from 'class-variance-authority';

export const inputFieldVariants = cva(
	'min-w-0 flex-1 bg-transparent placeholder-financy-gray-400 focus-within:outline-none',
	{
		variants: {
			state: {
				default: 'text-financy-gray-800',
				active: 'text-financy-gray-800',
				filled: 'text-financy-gray-800',
				error: 'text-financy-gray-800',
				disabled: 'text-financy-black',
			},
		},
		defaultVariants: {
			state: 'default',
		},
	},
);

export const labelVariants = cva('font-medium text-sm', {
	variants: {
		state: {
			default: 'text-financy-gray-700',
			active: 'text-financy-green-base',
			filled: 'text-financy-gray-700',
			error: 'text-financy-danger',
			disabled: 'text-financy-gray-700',
		},
	},
	defaultVariants: {
		state: 'default',
	},
});

export const prefixVariants = cva(
	'flex h-4 w-4 shrink-0 items-center justify-center',
	{
		variants: {
			state: {
				default: 'text-financy-gray-400',
				active: 'text-financy-green-base',
				filled: 'text-financy-gray-800',
				error: 'text-financy-danger',
				disabled: 'text-financy-black',
			},
		},
		defaultVariants: {
			state: 'default',
		},
	},
);

export const passwordToggleVariants = cva(
	'flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center',
	{
		variants: {
			state: {
				default: 'text-financy-gray-700',
				active: 'text-financy-green-base',
				filled: 'text-financy-gray-800',
				error: 'text-financy-danger',
				disabled: 'cursor-not-allowed text-financy-black',
			},
		},
		defaultVariants: {
			state: 'default',
		},
	},
);
