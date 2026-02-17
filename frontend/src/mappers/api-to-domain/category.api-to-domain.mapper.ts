import {
	CATEGORY_COLOR_FALLBACK,
	CATEGORY_ICON_COMPONENT_BY_NAME,
} from '@/constants/category';
import type { ListCategoriesResponse } from '@/types/api/operations';
import type { Category, CategoryColor, CategoryIconName } from '@/types/domain/category';

export function toCategoryColor(color: string): CategoryColor {
	switch (color) {
		case 'blue':
		case 'purple':
		case 'yellow':
		case 'pink':
		case 'green':
		case 'orange':
		case 'red':
			return color;
		default:
			return CATEGORY_COLOR_FALLBACK;
	}
}

export function toCategoryIconName(icon: string): CategoryIconName {
	if (icon in CATEGORY_ICON_COMPONENT_BY_NAME) {
		return icon as CategoryIconName;
	}

	return 'briefcase-business';
}

export function mapApiCategoryToDomain(
	category: ListCategoriesResponse['categories'][number],
): Category {
	return {
		...category,
		icon: toCategoryIconName(category.icon),
		color: toCategoryColor(category.color),
	};
}
