import { beforeEach, describe, expect, it } from 'vitest';
import { AUTH_STORAGE_KEY, authStateStorage } from './auth-storage';

function getPersistPayload(rememberMe: boolean) {
	return JSON.stringify({
		state: {
			user: {
				id: 'user-1',
				email: 'user@example.com',
				name: 'John Doe',
			},
			token: 'token-123',
			rememberMe,
		},
		version: 0,
	});
}

describe('authStateStorage', () => {
	beforeEach(() => {
		sessionStorage.clear();
		localStorage.clear();
	});

	it('writes to localStorage when rememberMe is true', () => {
		const payload = getPersistPayload(true);

		authStateStorage.setItem(AUTH_STORAGE_KEY, payload);

		expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBe(payload);
		expect(sessionStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
	});

	it('writes to sessionStorage when rememberMe is false', () => {
		const payload = getPersistPayload(false);

		authStateStorage.setItem(AUTH_STORAGE_KEY, payload);

		expect(sessionStorage.getItem(AUTH_STORAGE_KEY)).toBe(payload);
		expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
	});

	it('prefers sessionStorage on getItem when both storages have data', () => {
		const sessionPayload = getPersistPayload(false);
		const localPayload = getPersistPayload(true);
		sessionStorage.setItem(AUTH_STORAGE_KEY, sessionPayload);
		localStorage.setItem(AUTH_STORAGE_KEY, localPayload);

		const value = authStateStorage.getItem(AUTH_STORAGE_KEY);

		expect(value).toBe(sessionPayload);
	});

	it('removes data from both storages', () => {
		const payload = getPersistPayload(true);
		sessionStorage.setItem(AUTH_STORAGE_KEY, payload);
		localStorage.setItem(AUTH_STORAGE_KEY, payload);

		authStateStorage.removeItem(AUTH_STORAGE_KEY);

		expect(sessionStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
		expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
	});
});
