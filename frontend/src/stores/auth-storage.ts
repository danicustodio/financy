import type { StateStorage } from 'zustand/middleware';

type PersistedAuthEnvelope = {
	state?: {
		rememberMe?: boolean;
	};
};

export const AUTH_STORAGE_KEY = 'auth-storage';

function shouldUsePersistentStorage(value: string): boolean {
	try {
		const parsed = JSON.parse(value) as PersistedAuthEnvelope;
		return parsed.state?.rememberMe === true;
	} catch {
		return false;
	}
}

export const authStateStorage: StateStorage = {
	getItem: (key) => sessionStorage.getItem(key) ?? localStorage.getItem(key),
	setItem: (key, value) => {
		if (shouldUsePersistentStorage(value)) {
			localStorage.setItem(key, value);
			sessionStorage.removeItem(key);
			return;
		}

		sessionStorage.setItem(key, value);
		localStorage.removeItem(key);
	},
	removeItem: (key) => {
		sessionStorage.removeItem(key);
		localStorage.removeItem(key);
	},
};
