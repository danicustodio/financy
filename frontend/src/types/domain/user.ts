import type { ID } from '../primitives';

export interface UserProfile {
	id: ID;
	name: string;
	email: string;
}

export interface AuthSession {
	token: string;
	user: UserProfile;
}
