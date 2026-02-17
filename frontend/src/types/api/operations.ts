import type { Category, CategorySummary } from '../domain/category';
import type { Transaction, TransactionType } from '../domain/transaction';
import type { UserProfile } from '../domain/user';
import type { ISODateString } from '../primitives';

type ApiCategory = Omit<Category, 'icon' | 'color'> & {
	icon: string;
	color: string;
};
type ApiCategorySummary = Omit<CategorySummary, 'icon' | 'color'> & {
	icon: string;
	color: string;
};

export interface ListTransactionsResponse {
	transactions: (Omit<Transaction, 'category'> & {
		category: ApiCategorySummary;
	})[];
}

export interface ListCategoriesResponse {
	categories: ApiCategory[];
}

export interface DashboardSummaryData {
	totalBalance: number;
	monthlyIncome: number;
	monthlyExpense: number;
}

export interface DashboardSummaryResponse {
	dashboardSummary: DashboardSummaryData;
}

export interface DashboardSummaryVariables {
	month: number;
	year: number;
}

export type CreateCategoryInput = Omit<Category, 'id' | 'description'> & {
	description: string;
};

export interface CreateCategoryResponse {
	createCategory: ApiCategory;
}

export interface CreateTransactionInput {
	description: string;
	amount: number;
	type: TransactionType;
	date: ISODateString;
	categoryId: string;
}

export interface CreateTransactionResponse {
	createTransaction: {
		id: string;
	};
}

export interface SignInInput {
	email: string;
	password: string;
}

export interface SignUpInput {
	name: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	token: string;
	user: UserProfile;
}

export interface LoginResponse {
	login: AuthResponse;
}

export interface SignUpResponse {
	signUp: AuthResponse;
}
