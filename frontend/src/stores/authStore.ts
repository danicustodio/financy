import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LOGIN_MUTATION, SIGN_UP_MUTATION } from '@/lib/graphql';
import { publicGraphqlRequest } from '@/lib/graphql/graphql-client';

interface User {
	id: string;
	email: string;
	name: string;
}

interface SignUpResponse {
	signUp: {
		token: string;
		user: User;
	};
}

interface LoginResponse {
	login: {
		token: string;
		user: User;
	};
}

interface AuthState {
	user: User | null;
	token: string | null;
	login: (email: string, password: string) => Promise<void>;
	signup: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
	setToken: (token: string | null) => void;
	setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,

			login: async (email: string, password: string) => {
				const data = await publicGraphqlRequest<
					LoginResponse,
					{ input: { email: string; password: string } }
				>(LOGIN_MUTATION, { input: { email, password } })();

				set({
					user: data.login.user,
					token: data.login.token,
				});
			},

			signup: async (name: string, email: string, password: string) => {
				const data = await publicGraphqlRequest<
					SignUpResponse,
					{ input: { name: string; email: string; password: string } }
				>(SIGN_UP_MUTATION, { input: { name, email, password } })();

				set({
					user: data.signUp.user,
					token: data.signUp.token,
				});
			},

			logout: () => {
				set({
					user: null,
					token: null,
				});
			},

			setToken: (token: string | null) => {
				if (!token) {
					set({ user: null, token: null });
					return;
				}

				set({ token });
			},

			setUser: (user: User) => {
				set({ user });
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				token: state.token,
			}),
		},
	),
);
