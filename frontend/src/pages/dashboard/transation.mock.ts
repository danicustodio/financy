// Sample data for recent transactions
export const MOCK_TRANSACTIONS = [
	{
		id: 1,
		description: 'Pagamento de Salário',
		date: '01/12/25',
		category: 'Receita',
		categoryColor: 'green' as const,
		amount: 'R$ 4.250,00',
		type: 'income' as const,
		iconBgColor: '#E0FAE9', // green-light
	},
	{
		id: 2,
		description: 'Jantar no Restaurante',
		date: '30/11/25',
		category: 'Alimentação',
		categoryColor: 'blue' as const,
		amount: 'R$ 89,50',
		type: 'expense' as const,
		iconBgColor: '#DBEAFE', // blue-light
	},
	{
		id: 3,
		description: 'Posto de Gasolina',
		date: '29/11/25',
		category: 'Transporte',
		categoryColor: 'purple' as const,
		amount: 'R$ 100,00',
		type: 'expense' as const,
		iconBgColor: '#F3E8FF', // purple-light
	},
	{
		id: 4,
		description: 'Compras no Mercado',
		date: '28/11/25',
		category: 'Mercado',
		categoryColor: 'orange' as const,
		amount: 'R$ 156,80',
		type: 'expense' as const,
		iconBgColor: '#FFEDD5', // orange-light
	},
	{
		id: 5,
		description: 'Retorno de Investimento',
		date: '26/11/25',
		category: 'Investimento',
		categoryColor: 'green' as const,
		amount: 'R$ 340,25',
		type: 'income' as const,
		iconBgColor: '#E0FAE9', // green-light
	},
];

// Sample data for categories
export const MOCK_CATEGORIES = [
	{
		id: 1,
		category: 'Alimentação',
		categoryColor: 'blue' as const,
		itemCount: 12,
		amount: 'R$ 542,30',
	},
	{
		id: 2,
		category: 'Transporte',
		categoryColor: 'purple' as const,
		itemCount: 8,
		amount: 'R$ 385,50',
	},
	{
		id: 3,
		category: 'Mercado',
		categoryColor: 'orange' as const,
		itemCount: 3,
		amount: 'R$ 298,75',
	},
	{
		id: 4,
		category: 'Entretenimento',
		categoryColor: 'pink' as const,
		itemCount: 2,
		amount: 'R$ 186,20',
	},
	{
		id: 5,
		category: 'Utilidades',
		categoryColor: 'yellow' as const,
		itemCount: 7,
		amount: 'R$ 245,80',
	},
];
