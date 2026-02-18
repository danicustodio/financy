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

export interface TransactionFilterInput {
	search?: string;
	type?: string;
	categoryId?: string;
	month?: number;
	year?: number;
}

export interface TransactionPaginationInput {
	page: number;
	pageSize: number;
}

export interface TransactionPageData {
	totalCount: number;
	items: (Omit<Transaction, 'category'> & {
		category: ApiCategorySummary;
	})[];
}

export interface ListTransactionsResponse {
	transactions: TransactionPageData;
}

export interface ListTransactionsVariables {
	filter?: TransactionFilterInput;
	pagination?: TransactionPaginationInput;
}

export interface MostUsedCategorySummaryData {
	id: string;
	title: string;
	icon: string;
	color: string;
	transactionCount: number;
}

export interface CategoriesSummaryData {
	totalCategories: number;
	totalTransactions: number;
	mostUsedCategory: MostUsedCategorySummaryData | null;
}

export interface CategoriesSummaryResponse {
	categoriesSummary: CategoriesSummaryData;
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

export interface CreateCategoryInput {
	title: string;
	icon: Category['icon'];
	color: Category['color'];
	description: string;
}

export interface CreateCategoryResponse {
	createCategory: ApiCategory;
}

export interface UpdateCategoryInput extends CreateCategoryInput {
	id: string;
}

export interface UpdateCategoryResponse {
	updateCategory: ApiCategory;
}

export interface DeleteCategoryResponse {
	deleteCategory: boolean;
}

export interface DeleteCategoryVariables {
	id: string;
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
