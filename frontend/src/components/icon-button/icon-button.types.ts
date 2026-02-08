import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { IconButtonVariants } from './icon-button.variants';

export interface IconButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		IconButtonVariants {
	icon: ReactNode;
}
