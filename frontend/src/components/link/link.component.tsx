import { cn } from '@/lib/utils';
import type { LinkProps } from './link.types';

export const Link = ({ children, className, ...props }: LinkProps) => {
	return (
		<a
			className={cn(
				'inline-flex items-center font-medium text-sm transition-all duration-200 text-financy-brand-base hover:underline hover:underline-offset-2',
				className,
			)}
			{...props}
		>
			{children}
		</a>
	);
};
