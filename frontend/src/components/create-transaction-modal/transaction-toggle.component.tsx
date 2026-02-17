import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import {
	transactionTypeGroupVariants,
	transactionTypeItemVariants,
} from './create-transaction-modal.variants';

export interface TransactionToggleProps {
	value: 'expense' | 'income';
	onChange: (value: 'expense' | 'income') => void;
}

export const TransactionToggle = ({ value, onChange }: TransactionToggleProps) => {
	return (
		<ToggleGroup
			type="single"
			value={value}
			onValueChange={(nextValue) => {
				if (nextValue) {
					onChange(nextValue as 'expense' | 'income');
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
