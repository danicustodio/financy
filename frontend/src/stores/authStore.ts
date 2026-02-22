import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AUTH_STORAGE_KEY, authStateStorage } from './auth-storage';

export interface AuthUser {
	id: string;
	email: string;
	name: string;
}

interface AuthState {
	user: AuthUser | null;
	token: string | null;
	rememberMe: boolean;
	setSession: (user: AuthUser, token: string, rememberMe: boolean) => void;
	logout: () => void;
	setToken: (token: string | null) => void;
	setUser: (user: AuthUser) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			rememberMe: false,

			setSession: (user: AuthUser, token: string, rememberMe: boolean) => {
				set({
					user,
					token,
					rememberMe,
				});
			},

			logout: () => {
				set({
					user: null,
					token: null,
					rememberMe: false,
				});
			},

			setToken: (token: string | null) => {
				if (!token) {
					set({ user: null, token: null, rememberMe: false });
					return;
				}

				set({ token });
			},

			setUser: (user: AuthUser) => {
				set({ user });
			},
		}),
		{
			name: AUTH_STORAGE_KEY,
			storage: createJSONStorage(() => authStateStorage),
			partialize: (state) => ({
				user: state.user,
				token: state.token,
				rememberMe: state.rememberMe,
			}),
		},
	),
);
