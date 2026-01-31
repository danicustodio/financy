import { cn } from '@/lib/utils';
import type { InputProps } from './input.types';
import {
	inputFieldVariants,
	labelVariants,
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
	function getCurrentVariant() {
		if (disabled) return 'disabled';
		if (error) return 'error';
		if (active) return 'active';
		if (value) return 'filled';
		return 'default';
	}

	const variant = getCurrentVariant();

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
					type={type}
					className={cn(
						inputFieldVariants({
							state: variant,
						}),
					)}
					{...props}
				/>
			</div>

			{helper && <p className="text-xs text-financy-gray-500">{helper}</p>}
		</div>
	);
};
