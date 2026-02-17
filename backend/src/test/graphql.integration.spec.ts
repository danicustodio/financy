import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../app/server';

const SIGN_UP_MUTATION = `
mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    token
    user {
      id
      email
      name
    }
  }
}`;

const ME_QUERY = `
query Me {
  me {
    id
    email
    name
  }
}`;

const CREATE_CATEGORY_MUTATION = `
mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    id
    title
  }
}`;

const CREATE_TRANSACTION_MUTATION = `
mutation CreateTransaction($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
    id
    description
    amount
    type
  }
}`;

describe('GraphQL integration', () => {
	let app: Awaited<ReturnType<typeof createApp>>;

	beforeAll(async () => {
		app = await createApp();
		await app.ready();
		await app.prisma.transaction.deleteMany();
		await app.prisma.category.deleteMany();
		await app.prisma.user.deleteMany();
	});

	afterAll(async () => {
		await app.close();
	});

	it('signUp creates account and returns token', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Jane',
						email: `jane-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});

		const body = response.json();
		expect(body.errors).toBeUndefined();
		expect(body.data.signUp.token).toEqual(expect.any(String));
		expect(body.data.signUp.user.email).toContain('@example.com');
	});

	it('me query returns UNAUTHENTICATED without token', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: { query: ME_QUERY },
		});

		const body = response.json();
		expect(body.data.me).toBeNull();
		expect(body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
	});

	it('createTransaction creates a transaction for authenticated user', async () => {
		const signUpResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'John',
						email: `john-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});

		const signUpBody = signUpResponse.json();
		expect(signUpBody.errors).toBeUndefined();
		const token = signUpBody.data.signUp.token as string;

		const createCategoryResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: {
				authorization: `Bearer ${token}`,
			},
			payload: {
				query: CREATE_CATEGORY_MUTATION,
				variables: {
					input: {
						title: 'Salary',
						icon: 'briefcase-business',
						description: 'Monthly salary',
						color: 'green',
					},
				},
			},
		});

		const createCategoryBody = createCategoryResponse.json();
		expect(createCategoryBody.errors).toBeUndefined();
		const categoryId = createCategoryBody.data.createCategory.id as string;

		const createTransactionResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: {
				authorization: `Bearer ${token}`,
			},
			payload: {
				query: CREATE_TRANSACTION_MUTATION,
				variables: {
					input: {
						description: 'Monthly salary payment',
						amount: 450000,
						type: 'income',
						date: new Date().toISOString(),
						categoryId,
					},
				},
			},
		});

		const createTransactionBody = createTransactionResponse.json();
		expect(createTransactionBody.errors).toBeUndefined();
		expect(createTransactionBody.data.createTransaction.id).toEqual(
			expect.any(String),
		);
		expect(createTransactionBody.data.createTransaction.description).toBe(
			'Monthly salary payment',
		);
		expect(createTransactionBody.data.createTransaction.amount).toBe(450000);
		expect(createTransactionBody.data.createTransaction.type).toBe('income');
	});
});
