import { AppError } from '../errors/app-error';
import { errorCodes } from '../errors/error-codes';

export function requireOwnership(
	resourceUserId: string,
	currentUserId: string,
): void {
	if (resourceUserId !== currentUserId) {
		throw new AppError(errorCodes.FORBIDDEN, 'Forbidden');
	}
}
