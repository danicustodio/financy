import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

type SeedCategory = {
	name: string;
	icon: string;
	color: string;
	description: string;
};

type SeedTransaction = {
	description: string;
	amount: number;
	type: 'income' | 'expense';
	date: string;
	categoryName: string;
};

const adapter = new PrismaBetterSqlite3({
	url: 'file:./prisma/dev.db',
});

const prisma = new PrismaClient({ adapter });

const users = [
	{
		name: 'Demo User',
		email: 'demo@financy.local',
		password: '12345678',
		categories: [
			{
				name: 'Salary',
				icon: 'briefcase-business',
				color: 'green',
				description: 'Primary monthly income',
			},
			{
				name: 'Groceries',
				icon: 'shopping-cart',
				color: 'blue',
				description: 'Supermarket and essentials',
			},
			{
				name: 'Housing',
				icon: 'house',
				color: 'orange',
				description: 'Rent and housing costs',
			},
			{
				name: 'Health',
				icon: 'heart-pulse',
				color: 'red',
				description: 'Medication and doctor expenses',
			},
		] as SeedCategory[],
		transactions: [
			{
				description: 'Monthly salary',
				amount: 620000,
				type: 'income',
				date: '2026-02-01T09:00:00.000Z',
				categoryName: 'Salary',
			},
			{
				description: 'Apartment rent',
				amount: 180000,
				type: 'expense',
				date: '2026-02-03T14:30:00.000Z',
				categoryName: 'Housing',
			},
			{
				description: 'Supermarket purchase',
				amount: 42890,
				type: 'expense',
				date: '2026-02-07T18:15:00.000Z',
				categoryName: 'Groceries',
			},
			{
				description: 'Pharmacy',
				amount: 11990,
				type: 'expense',
				date: '2026-02-10T12:10:00.000Z',
				categoryName: 'Health',
			},
		] as SeedTransaction[],
	},
	{
		name: 'Second User',
		email: 'second@financy.local',
		password: '12345678',
		categories: [
			{
				name: 'Freelance',
				icon: 'tool-case',
				color: 'purple',
				description: 'Freelance and side projects',
			},
			{
				name: 'Transport',
				icon: 'car-front',
				color: 'gray',
				description: 'Fuel and ride-sharing',
			},
			{
				name: 'Leisure',
				icon: 'ticket',
				color: 'pink',
				description: 'Entertainment expenses',
			},
		] as SeedCategory[],
		transactions: [
			{
				description: 'Client payment',
				amount: 210000,
				type: 'income',
				date: '2026-02-02T10:00:00.000Z',
				categoryName: 'Freelance',
			},
			{
				description: 'Fuel refill',
				amount: 27500,
				type: 'expense',
				date: '2026-02-06T08:45:00.000Z',
				categoryName: 'Transport',
			},
			{
				description: 'Cinema tickets',
				amount: 4600,
				type: 'expense',
				date: '2026-02-11T20:00:00.000Z',
				categoryName: 'Leisure',
			},
		] as SeedTransaction[],
	},
];

async function seedUser(userSeed: (typeof users)[number]) {
	const passwordHash = await bcrypt.hash(userSeed.password, 12);

	const user = await prisma.user.upsert({
		where: { email: userSeed.email },
		update: {
			name: userSeed.name,
			passwordHash,
		},
		create: {
			name: userSeed.name,
			email: userSeed.email,
			passwordHash,
		},
	});

	for (const category of userSeed.categories) {
		await prisma.category.upsert({
			where: {
				name_userId: {
					name: category.name,
					userId: user.id,
				},
			},
			update: {
				icon: category.icon,
				color: category.color,
				description: category.description,
			},
			create: {
				name: category.name,
				icon: category.icon,
				color: category.color,
				description: category.description,
				userId: user.id,
			},
		});
	}

	await prisma.transaction.deleteMany({ where: { userId: user.id } });

	const categories = await prisma.category.findMany({ where: { userId: user.id } });
	const categoriesByName = new Map(categories.map((category) => [category.name, category.id]));

	await prisma.transaction.createMany({
		data: userSeed.transactions.map((transaction) => {
			const categoryId = categoriesByName.get(transaction.categoryName);

			if (!categoryId) {
				throw new Error(
					`Category \"${transaction.categoryName}\" not found for user ${user.email}`,
				);
			}

			return {
				description: transaction.description,
				amount: transaction.amount,
				type: transaction.type,
				date: new Date(transaction.date),
				categoryId,
				userId: user.id,
			};
		}),
	});
}

async function main() {
	for (const userSeed of users) {
		await seedUser(userSeed);
	}

	console.log('Seed completed successfully.');
	console.log('Users:');
	console.log('- demo@financy.local / 12345678');
	console.log('- second@financy.local / 12345678');
}

main()
	.catch((error) => {
		console.error('Seed failed:', error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
