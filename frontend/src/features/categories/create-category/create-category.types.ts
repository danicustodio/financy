export interface CreateCategoryFormData {
	name: string;
	description: string;
	icon: string;
	color: string;
}

export interface CreateCategoryResponse {
	createCategory: {
		id: string;
		name: string;
		icon: string;
		description: string | null;
		color: string;
	};
}
