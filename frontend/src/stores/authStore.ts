import { GraphQLClient } from 'graphql-request';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const gqlClient = new GraphQLClient(import.meta.env.VITE_API_URL);

const SIGN_UP_MUTATION = /* GraphQL */ `
	mutation SignUp($input: SignUpInput!) {
		signUp(input: $input) {
			token
			user {
				id
				name
				email
			}
		}
	}
`;

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

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	signup: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
	setToken: (token: string) => void;
	setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isAuthenticated: false,

			login: async (_email: string, _password: string) => {
				// TODO: Implement when backend login mutation is available
				throw new Error('Login is not yet implemented');
			},

			signup: async (name: string, email: string, password: string) => {
				const data = await gqlClient.request<SignUpResponse>(
					SIGN_UP_MUTATION,
					{ input: { name, email, password } },
				);

				set({
					user: data.signUp.user,
					token: data.signUp.token,
					isAuthenticated: true,
				});
			},

			logout: () => {
				set({
					user: null,
					token: null,
					isAuthenticated: false,
				});
			},

			setToken: (token: string) => {
				set({ token, isAuthenticated: true });
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
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);
