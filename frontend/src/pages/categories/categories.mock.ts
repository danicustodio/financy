import type { CategoryColor } from '@/components/categories';

// Sample data for categories
export const MOCK_CATEGORIES: {
	id: number;
	name: string;
	description: string;
	color: CategoryColor;
	itemCount: number;
}[] = [
	{
		id: 1,
		name: 'Alimentação',
		description: 'Restaurantes, delivery e refeições',
		color: 'blue',
		itemCount: 12,
	},
	{
		id: 2,
		name: 'Transporte',
		description: 'Gasolina, transporte público e viagens',
		color: 'purple',
		itemCount: 8,
	},
	{
		id: 3,
		name: 'Utilidades',
		description: 'Energia, água, internet e telefone',
		color: 'yellow',
		itemCount: 7,
	},
	{
		id: 4,
		name: 'Entretenimento',
		description: 'Cinema, jogos e lazer',
		color: 'pink',
		itemCount: 2,
	},
	{
		id: 5,
		name: 'Investimento',
		description: 'Aplicações e retornos financeiros',
		color: 'green',
		itemCount: 1,
	},
	{
		id: 6,
		name: 'Mercado',
		description: 'Compras de supermercado e mantimentos',
		color: 'orange',
		itemCount: 3,
	},
	{
		id: 7,
		name: 'Salário',
		description: 'Renda mensal e bonificações',
		color: 'green',
		itemCount: 3,
	},
	{
		id: 8,
		name: 'Saúde',
		description: 'Medicamentos, consultas e exames',
		color: 'red',
		itemCount: 0,
	},
];
