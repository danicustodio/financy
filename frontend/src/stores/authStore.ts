import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
	id: string;
	email: string;
	name: string;
}

interface AuthState {
	user: AuthUser | null;
	token: string | null;
	setSession: (user: AuthUser, token: string) => void;
	logout: () => void;
	setToken: (token: string | null) => void;
	setUser: (user: AuthUser) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,

			setSession: (user: AuthUser, token: string) => {
				set({
					user,
					token,
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

			setUser: (user: AuthUser) => {
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
