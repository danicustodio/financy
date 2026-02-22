import { faker } from '@faker-js/faker';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaBetterSqlite3({
	url: 'file:./prisma/dev.db',
});

const prisma = new PrismaClient({ adapter });

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]): {
	count: number;
	email: string;
	append: boolean;
} {
	const args = argv.slice(2);
	let count = 50;
	let email = 'demo@financy.local';
	let append = false;

	for (let i = 0; i < args.length; i++) {
		if (args[i] === '--count') {
			const raw = args[i + 1];
			if (raw === undefined || Number.isNaN(Number(raw))) {
				console.error('Error: --count requires a numeric argument.');
				process.exit(1);
			}
			count = Number.parseInt(raw, 10);
			if (!Number.isInteger(count) || count < 1 || count > 1000) {
				console.error('Error: --count must be an integer between 1 and 1000.');
				process.exit(1);
			}
			i++;
		} else if (args[i] === '--email') {
			const raw = args[i + 1];
			if (raw === undefined || raw.startsWith('--')) {
				console.error('Error: --email requires an email argument.');
				process.exit(1);
			}
			email = raw;
			i++;
		} else if (args[i] === '--append') {
			append = true;
		}
	}

	return { count, email, append };
}

// ---------------------------------------------------------------------------
// Random helpers
// ---------------------------------------------------------------------------

function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDateWithinLastYear(): Date {
	const now = Date.now();
	const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000;
	return new Date(oneYearAgo + Math.random() * (now - oneYearAgo));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
	const { count, email, append } = parseArgs(process.argv);

	// 1. Resolve user
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		console.error(
			`Error: No user found with email "${email}".`,
			'\nRun `pnpm prisma:seed` first to create seed users.',
		);
		process.exit(1);
	}

	// 2. Load categories
	const categories = await prisma.category.findMany({
		where: { userId: user.id },
	});
	if (categories.length === 0) {
		console.error(
			`Error: User "${email}" has no categories.`,
			'\nRun `pnpm prisma:seed` to create categories for this user.',
		);
		process.exit(1);
	}

	// 3. Replace or append
	if (!append) {
		await prisma.transaction.deleteMany({ where: { userId: user.id } });
	}

	// 4. Build fake transactions
	const transactions = Array.from({ length: count }, () => {
		const type = Math.random() < 0.3 ? 'income' : 'expense';
		const amount =
			type === 'income' ? randomInt(50_000, 500_000) : randomInt(500, 50_000);
		const category = categories[Math.floor(Math.random() * categories.length)];
		const date = randomDateWithinLastYear();
		const description =
			Math.random() < 0.5 ? faker.commerce.productName() : faker.lorem.words(3);

		return {
			type: type as 'income' | 'expense',
			amount,
			date,
			description,
			categoryId: category.id,
			userId: user.id,
		};
	});

	// 5. Insert
	await prisma.transaction.createMany({ data: transactions });

	// 6. Summary
	const dates = transactions.map((t) => t.date.getTime());
	const earliest = new Date(Math.min(...dates)).toISOString().slice(0, 10);
	const latest = new Date(Math.max(...dates)).toISOString().slice(0, 10);

	console.log('');
	console.log('Bulk transaction seed completed.');
	console.log(`  Mode    : ${append ? 'append' : 'replace'}`);
	console.log(`  User    : ${email}`);
	console.log(`  Inserted: ${count}`);
	console.log(`  Dates   : ${earliest} → ${latest}`);
	console.log('');
}

main()
	.catch((error) => {
		console.error('Seed failed:', error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
