import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InputProps } from './input.types';
import {
	inputFieldVariants,
	labelVariants,
	passwordToggleVariants,
	prefixVariants,
} from './input.variants';

export const Input = ({
	label,
	type,
	id,
	disabled,
	error,
	active,
	value,
	prefix,
	helper,
	...props
}: InputProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const isPasswordType = type === 'password';

	function getCurrentVariant() {
		if (disabled) return 'disabled';
		if (error) return 'error';
		if (active) return 'active';
		if (value) return 'filled';
		return 'default';
	}

	const variant = getCurrentVariant();

	const togglePasswordVisibility = () => {
		if (!disabled) {
			setShowPassword((prev) => !prev);
		}
	};

	const inputType = isPasswordType && showPassword ? 'text' : type;

	return (
		<div className="flex flex-col gap-2">
			{label && (
				<label htmlFor={id} className={cn(labelVariants({ state: variant }))}>
					{label}
				</label>
			)}

			<div
				className={cn(
					'flex items-center gap-3 p-3 py-3.5 w-full rounded-md',
					'bg-financy-white, border border-financy-gray-300',
				)}
			>
				{prefix && (
					<span className={cn(prefixVariants({ state: variant }))}>
						{prefix}
					</span>
				)}

				<input
					type={inputType}
					className={cn(
						inputFieldVariants({
							state: variant,
						}),
					)}
					{...props}
				/>

				{isPasswordType && (
					<button
						type="button"
						onClick={togglePasswordVisibility}
						disabled={disabled}
						className={cn(passwordToggleVariants({ state: variant }))}
						aria-label={showPassword ? 'Hide password' : 'Show password'}
					>
						{showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
					</button>
				)}
			</div>

			{helper && <p className="text-xs text-financy-gray-500">{helper}</p>}
		</div>
	);
};
