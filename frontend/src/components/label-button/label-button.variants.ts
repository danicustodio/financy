import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
	[
		'inline-flex items-center justify-center gap-2',
		'rounded-md font-medium transition-colors duration-200',
		'cursor-pointer',
		'disabled:pointer-events-none disabled:opacity-50',
	].join(' '),
	{
		variants: {
			variant: {
				default: [
					'bg-financy-brand-base text-financy-white',
					'hover:bg-financy-brand-dark',
				].join(' '),
				outline: [
					'border border-financy-gray-300 bg-transparent text-financy-gray-700',
					'hover:bg-financy-gray-200',
				].join(' '),
			},
			size: {
				md: 'px-4 py-3 text-base',
				sm: 'px-3 py-2 text-sm',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

export const iconVariants = cva('flex shrink-0 items-center justify-center', {
	variants: {
		variant: {
			default: 'text-financy-gray-100',
			outline: 'text-financy-gray-700',
		},
		size: {
			md: 'h-4.5 w-4.5',
			sm: 'h-4 w-4',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'md',
	},
});
