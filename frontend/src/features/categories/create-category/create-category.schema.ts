import type { RegisterOptions } from 'react-hook-form';
import type { CreateCategoryFormData } from './create-category.types';

export const createCategoryFormRules: Pick<
	{
		[K in keyof CreateCategoryFormData]: RegisterOptions<
			CreateCategoryFormData,
			K
		>;
	},
	'name'
> = {
	name: {
		required: 'Título é obrigatório',
		minLength: {
			value: 1,
			message: 'Título é obrigatório',
		},
	},
};
