import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
	label?: string;
	active?: boolean;
	error?: boolean;
	helper?: string;
	prefix?: ReactNode
}
