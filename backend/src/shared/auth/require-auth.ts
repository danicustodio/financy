import type { User } from '@prisma/client';
import { AppError } from '../errors/app-error';
import { errorCodes } from '../errors/error-codes';

export function requireAuth(currentUser: User | null): User {
	if (!currentUser) {
		throw new AppError(errorCodes.UNAUTHENTICATED, 'Not authenticated');
	}

	return currentUser;
}
