import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TypeTagProps } from './type-tag.types';
import { typeTagVariants } from './type-tag.variants';

export const TypeTag = ({ type = 'expense', className }: TypeTagProps) => {
	const isIncome = type === 'income';
	const Icon = isIncome ? CircleArrowUp : CircleArrowDown;
	const label = isIncome ? 'Entrada' : 'Saída';

	return (
		<span className={cn(typeTagVariants({ type }), className)}>
			<Icon className="h-4 w-4" />
			{label}
		</span>
	);
};
