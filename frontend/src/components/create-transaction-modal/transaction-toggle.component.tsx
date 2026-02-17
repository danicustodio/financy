import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import type { TransactionType } from '@/types/domain/transaction';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import {
	transactionTypeGroupVariants,
	transactionTypeItemVariants,
} from './create-transaction-modal.variants';

export interface TransactionToggleProps {
	value: TransactionType;
	onChange: (value: TransactionType) => void;
}

export const TransactionToggle = ({
	value,
	onChange,
}: TransactionToggleProps) => {
	return (
		<ToggleGroup
			type="single"
			value={value}
			onValueChange={(nextValue) => {
				if (nextValue === 'expense' || nextValue === 'income') {
					onChange(nextValue);
				}
			}}
			spacing={1}
			className={transactionTypeGroupVariants()}
		>
			<ToggleGroupItem
				value="expense"
				className={transactionTypeItemVariants({ type: 'expense' })}
			>
				<CircleArrowDown size={16} /> Despesa
			</ToggleGroupItem>
			<ToggleGroupItem
				value="income"
				className={transactionTypeItemVariants({ type: 'income' })}
			>
				<CircleArrowUp size={16} /> Receita
			</ToggleGroupItem>
		</ToggleGroup>
	);
};
