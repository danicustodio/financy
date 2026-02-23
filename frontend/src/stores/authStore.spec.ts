import { beforeEach, describe, expect, it } from 'vitest';
import type { AuthUser } from './authStore';
import { useAuthStore } from './authStore';

const user: AuthUser = {
	id: 'user-1',
	email: 'user@example.com',
	name: 'John Doe',
};

describe('useAuthStore', () => {
	beforeEach(() => {
		localStorage.clear();
		sessionStorage.clear();
		useAuthStore.setState({
			user: null,
			token: null,
			rememberMe: false,
		});
	});

	it('setSession stores user, token and rememberMe', () => {
		useAuthStore.getState().setSession(user, 'token-123', true);

		const state = useAuthStore.getState();
		expect(state.user).toEqual(user);
		expect(state.token).toBe('token-123');
		expect(state.rememberMe).toBe(true);
	});

	it('logout clears auth state', () => {
		useAuthStore.getState().setSession(user, 'token-123', true);

		useAuthStore.getState().logout();

		const state = useAuthStore.getState();
		expect(state.user).toBeNull();
		expect(state.token).toBeNull();
		expect(state.rememberMe).toBe(false);
	});

	it('setToken(null) clears full auth state', () => {
		useAuthStore.getState().setSession(user, 'token-123', true);

		useAuthStore.getState().setToken(null);

		const state = useAuthStore.getState();
		expect(state.user).toBeNull();
		expect(state.token).toBeNull();
		expect(state.rememberMe).toBe(false);
	});

	it('setToken(token) only updates token', () => {
		useAuthStore.getState().setSession(user, 'token-123', true);

		useAuthStore.getState().setToken('token-999');

		const state = useAuthStore.getState();
		expect(state.user).toEqual(user);
		expect(state.token).toBe('token-999');
		expect(state.rememberMe).toBe(true);
	});
});
