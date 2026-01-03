import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const inputContainerVariants = cva('flex flex-col gap-2 w-full', {
	variants: {
		state: {
			default: '',
			active: '',
			filled: '',
			error: '',
			disabled: 'opacity-50 cursor-not-allowed',
		},
	},
	defaultVariants: {
		state: 'default',
	},
});

const inputFieldVariants = cva(
	[
		'flex items-center gap-3 px-3 py-3.5 w-full rounded-lg',
		'bg-white border transition-colors duration-200',
		'text-base font-normal leading-[1.125em]',
		'focus-within:outline-none',
	].join(' '),
	{
		variants: {
			state: {
				default: 'border-gray-300 focus-within:border-green-500',
				active: 'border-green-500',
				filled: 'border-gray-300',
				error: 'border-red-500',
				disabled:
					'border-gray-300 bg-gray-50 cursor-not-allowed pointer-events-none',
			},
		},
		defaultVariants: {
			state: 'default',
		},
	},
);

const labelVariants = cva('text-sm font-medium leading-[1.43em]', {
	variants: {
		state: {
			default: 'text-gray-700',
			active: 'text-gray-700',
			filled: 'text-gray-700',
			error: 'text-gray-700',
			disabled: 'text-gray-400',
		},
	},
	defaultVariants: {
		state: 'default',
	},
});

const helperVariants = cva('text-xs leading-[1.33em]', {
	variants: {
		state: {
			default: 'text-gray-500',
			active: 'text-gray-500',
			filled: 'text-gray-500',
			error: 'text-red-500',
			disabled: 'text-gray-400',
		},
	},
	defaultVariants: {
		state: 'default',
	},
});

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>,
		VariantProps<typeof inputContainerVariants> {
	label?: string;
	helper?: string;
	error?: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			state,
			label,
			helper,
			error,
			prefix,
			suffix,
			disabled,
			type = 'text',
			...props
		},
		ref,
	) => {
		const effectiveState = disabled
			? 'disabled'
			: error
				? 'error'
				: (state ?? 'default');

		const helperText = error || helper;

		return (
			<div className={cn(inputContainerVariants({ state: effectiveState }))}>
				{label && (
					<label
						className={cn(labelVariants({ state: effectiveState }))}
						htmlFor={props.id}
					>
						{label}
					</label>
				)}
				<div
					className={cn(
						inputFieldVariants({ state: effectiveState }),
						className,
					)}
				>
					{prefix && (
						<span className="flex items-center justify-center text-gray-400 shrink-0">
							{prefix}
						</span>
					)}
					<input
						type={type}
						className={cn(
							'flex-1 bg-transparent border-none outline-none',
							'placeholder:text-gray-400 text-gray-800',
							'disabled:cursor-not-allowed',
						)}
						ref={ref}
						disabled={disabled}
						{...props}
					/>
					{suffix && (
						<span className="flex items-center justify-center text-gray-400 shrink-0">
							{suffix}
						</span>
					)}
				</div>
				{helperText && (
					<span className={cn(helperVariants({ state: effectiveState }))}>
						{helperText}
					</span>
				)}
			</div>
		);
	},
);

Input.displayName = 'Input';

export { Input, inputContainerVariants, inputFieldVariants };
