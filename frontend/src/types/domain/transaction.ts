import type { CurrencyAmount, ID, ISODateString } from '../primitives';
import type { Category } from './category';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
	id: ID;
	description: string;
	amount: CurrencyAmount;
	type: TransactionType;
	date: ISODateString;
	category: Pick<Category, 'id' | 'name' | 'icon' | 'color'>;
}
