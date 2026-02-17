import type { TransactionType } from '@/types/domain/transaction';

export const TRANSACTION_TYPES: readonly TransactionType[] = [
	'expense',
	'income',
] as const;
