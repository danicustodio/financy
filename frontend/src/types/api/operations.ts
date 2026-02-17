import type {
	Category,
	CategoryColor,
	CategoryIconName,
} from '../domain/category';
import type { TransactionType } from '../domain/transaction';
import type { UserProfile } from '../domain/user';
import type { ISODateString } from '../primitives';

export interface ListTransactionsResponse {
	transactions: {
		id: string;
		description: string;
		amount: number;
		type: TransactionType;
		date: ISODateString;
		category: {
			id: string;
			title: string;
			icon: string;
			color: string;
		};
	}[];
}

export interface ListCategoriesResponse {
	categories: {
		id: string;
		title: string;
		icon: string;
		description: string | null;
		color: string;
	}[];
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
	description: string;
	icon: CategoryIconName;
	color: CategoryColor;
}

export interface CreateCategoryResponse {
	createCategory: Pick<
		Category,
		'id' | 'title' | 'icon' | 'description' | 'color'
	>;
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
