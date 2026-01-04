import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
	id: string;
	email: string;
	name: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (email: string, _password: string) => Promise<void>;
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

			login: async (email: string, _password: string) => {
				// TODO: Replace with actual API call when backend is ready
				// Mock login - simulates JWT response
				const mockToken = `mock-jwt-token-${Date.now()}`;
				const mockUser: User = {
					id: '1',
					email,
					name: email.split('@')[0],
				};

				set({
					user: mockUser,
					token: mockToken,
					isAuthenticated: true,
				});
			},

			signup: async (name: string, email: string, _password: string) => {
				// TODO: Replace with actual API call when backend is ready
				// Mock signup - simulates JWT response
				const mockToken = `mock-jwt-token-${Date.now()}`;
				const mockUser: User = {
					id: `${Date.now()}`,
					email,
					name,
				};

				set({
					user: mockUser,
					token: mockToken,
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
