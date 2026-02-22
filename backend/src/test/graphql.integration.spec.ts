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

const REQUEST_PASSWORD_RESET_MUTATION = `
mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
  requestPasswordReset(input: $input)
}`;

const RESET_PASSWORD_MUTATION = `
mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input)
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

const DELETE_TRANSACTION_MUTATION = `
mutation DeleteTransaction($id: ID!) {
  deleteTransaction(id: $id)
}`;

const UPDATE_TRANSACTION_MUTATION = `
mutation UpdateTransaction($input: UpdateTransactionInput!) {
  updateTransaction(input: $input) {
    id
    description
    amount
    type
    category {
      id
    }
  }
}`;

describe('GraphQL integration', () => {
	let app: Awaited<ReturnType<typeof createApp>>;

	beforeAll(async () => {
		app = await createApp();
		await app.ready();
		await app.prisma.passwordResetToken.deleteMany();
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

	it('requestPasswordReset returns true for known and unknown emails', async () => {
		const knownEmail = `reset-known-${Date.now()}@example.com`;

		await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Reset Known',
						email: knownEmail,
						password: 'password123',
					},
				},
			},
		});

		const knownResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: REQUEST_PASSWORD_RESET_MUTATION,
				variables: { input: { email: knownEmail } },
			},
		});

		const unknownResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: REQUEST_PASSWORD_RESET_MUTATION,
				variables: { input: { email: `unknown-${Date.now()}@example.com` } },
			},
		});

		expect(knownResponse.json().errors).toBeUndefined();
		expect(knownResponse.json().data.requestPasswordReset).toBe(true);
		expect(unknownResponse.json().errors).toBeUndefined();
		expect(unknownResponse.json().data.requestPasswordReset).toBe(true);
	});

	it('resetPassword returns INVALID_RESET_TOKEN for invalid token', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: RESET_PASSWORD_MUTATION,
				variables: {
					input: {
						token: 'invalid-token',
						password: 'new-password-123',
					},
				},
			},
		});

		const body = response.json();
		expect(body.data.resetPassword).toBeNull();
		expect(body.errors[0].extensions.code).toBe('INVALID_RESET_TOKEN');
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

	it('deleteTransaction returns true for authenticated owner', async () => {
		const signUpResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Alice',
						email: `alice-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});
		const token = signUpResponse.json().data.signUp.token as string;

		const createCategoryResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${token}` },
			payload: {
				query: CREATE_CATEGORY_MUTATION,
				variables: {
					input: {
						title: 'Food',
						icon: 'utensils',
						description: 'Food expenses',
						color: 'orange',
					},
				},
			},
		});
		const categoryId = createCategoryResponse.json().data.createCategory
			.id as string;

		const createTransactionResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${token}` },
			payload: {
				query: CREATE_TRANSACTION_MUTATION,
				variables: {
					input: {
						description: 'Lunch',
						amount: 2000,
						type: 'expense',
						date: new Date().toISOString(),
						categoryId,
					},
				},
			},
		});
		const transactionId = createTransactionResponse.json().data
			.createTransaction.id as string;

		const deleteResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${token}` },
			payload: {
				query: DELETE_TRANSACTION_MUTATION,
				variables: { id: transactionId },
			},
		});

		const deleteBody = deleteResponse.json();
		expect(deleteBody.errors).toBeUndefined();
		expect(deleteBody.data.deleteTransaction).toBe(true);

		const record = await app.prisma.transaction.findUnique({
			where: { id: transactionId },
		});
		expect(record).toBeNull();
	});

	it('deleteTransaction returns UNAUTHENTICATED without token', async () => {
		const deleteResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: DELETE_TRANSACTION_MUTATION,
				variables: { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' },
			},
		});

		const body = deleteResponse.json();
		expect(body.data.deleteTransaction).toBeNull();
		expect(body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
	});

	it("deleteTransaction returns NOT_FOUND for another user's transaction", async () => {
		const ownerSignUp = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Owner',
						email: `owner-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});
		const ownerToken = ownerSignUp.json().data.signUp.token as string;

		const otherSignUp = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Other',
						email: `other-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});
		const otherToken = otherSignUp.json().data.signUp.token as string;

		const createCategoryResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${ownerToken}` },
			payload: {
				query: CREATE_CATEGORY_MUTATION,
				variables: {
					input: {
						title: 'Misc',
						icon: 'utensils',
						description: 'Misc',
						color: 'orange',
					},
				},
			},
		});
		const categoryId = createCategoryResponse.json().data.createCategory
			.id as string;

		const createTransactionResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${ownerToken}` },
			payload: {
				query: CREATE_TRANSACTION_MUTATION,
				variables: {
					input: {
						description: 'Owner expense',
						amount: 1000,
						type: 'expense',
						date: new Date().toISOString(),
						categoryId,
					},
				},
			},
		});
		const transactionId = createTransactionResponse.json().data
			.createTransaction.id as string;

		const deleteResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${otherToken}` },
			payload: {
				query: DELETE_TRANSACTION_MUTATION,
				variables: { id: transactionId },
			},
		});

		const body = deleteResponse.json();
		expect(body.data.deleteTransaction).toBeNull();
		expect(body.errors[0].extensions.code).toBe('NOT_FOUND');
	});

	it('deleteTransaction returns NOT_FOUND for non-existent id', async () => {
		const signUpResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Bob',
						email: `bob-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});
		const token = signUpResponse.json().data.signUp.token as string;

		const deleteResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${token}` },
			payload: {
				query: DELETE_TRANSACTION_MUTATION,
				variables: { id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22' },
			},
		});

		const body = deleteResponse.json();
		expect(body.data.deleteTransaction).toBeNull();
		expect(body.errors[0].extensions.code).toBe('NOT_FOUND');
	});

	it('updateTransaction updates fields for authenticated owner', async () => {
		const signUpResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Edit owner',
						email: `edit-owner-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});
		const token = signUpResponse.json().data.signUp.token as string;

		const createFirstCategoryResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${token}` },
			payload: {
				query: CREATE_CATEGORY_MUTATION,
				variables: {
					input: {
						title: `Food ${Date.now()}`,
						icon: 'utensils',
						description: 'Food',
						color: 'orange',
					},
				},
			},
		});
		const firstCategoryId = createFirstCategoryResponse.json().data
			.createCategory.id as string;

		const createSecondCategoryResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${token}` },
			payload: {
				query: CREATE_CATEGORY_MUTATION,
				variables: {
					input: {
						title: `Salary ${Date.now()}`,
						icon: 'briefcase-business',
						description: 'Salary',
						color: 'green',
					},
				},
			},
		});
		const secondCategoryId = createSecondCategoryResponse.json().data
			.createCategory.id as string;

		const createTransactionResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${token}` },
			payload: {
				query: CREATE_TRANSACTION_MUTATION,
				variables: {
					input: {
						description: 'Initial description',
						amount: 1200,
						type: 'expense',
						date: new Date().toISOString(),
						categoryId: firstCategoryId,
					},
				},
			},
		});
		const transactionId = createTransactionResponse.json().data
			.createTransaction.id as string;

		const updateResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${token}` },
			payload: {
				query: UPDATE_TRANSACTION_MUTATION,
				variables: {
					input: {
						id: transactionId,
						description: 'Updated description',
						amount: 3500,
						type: 'income',
						date: new Date('2026-01-10T12:00:00.000Z').toISOString(),
						categoryId: secondCategoryId,
					},
				},
			},
		});

		const updateBody = updateResponse.json();
		expect(updateBody.errors).toBeUndefined();
		expect(updateBody.data.updateTransaction.id).toBe(transactionId);
		expect(updateBody.data.updateTransaction.description).toBe(
			'Updated description',
		);
		expect(updateBody.data.updateTransaction.amount).toBe(3500);
		expect(updateBody.data.updateTransaction.type).toBe('income');
		expect(updateBody.data.updateTransaction.category.id).toBe(
			secondCategoryId,
		);

		const persisted = await app.prisma.transaction.findUnique({
			where: { id: transactionId },
		});
		expect(persisted?.description).toBe('Updated description');
		expect(persisted?.amount).toBe(3500);
		expect(persisted?.type).toBe('income');
		expect(persisted?.categoryId).toBe(secondCategoryId);
	});

	it('updateTransaction returns UNAUTHENTICATED without token', async () => {
		const updateResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: UPDATE_TRANSACTION_MUTATION,
				variables: {
					input: {
						id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
						description: 'Updated description',
						amount: 3500,
						type: 'income',
						date: new Date().toISOString(),
						categoryId: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
					},
				},
			},
		});

		const body = updateResponse.json();
		expect(body.data.updateTransaction).toBeNull();
		expect(body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
	});

	it("updateTransaction returns NOT_FOUND for another user's transaction", async () => {
		const ownerSignUp = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Update owner',
						email: `update-owner-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});
		const ownerToken = ownerSignUp.json().data.signUp.token as string;

		const otherSignUp = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Update other',
						email: `update-other-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});
		const otherToken = otherSignUp.json().data.signUp.token as string;

		const createCategoryResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${ownerToken}` },
			payload: {
				query: CREATE_CATEGORY_MUTATION,
				variables: {
					input: {
						title: `Owner category ${Date.now()}`,
						icon: 'utensils',
						description: 'Owner category',
						color: 'orange',
					},
				},
			},
		});
		const categoryId = createCategoryResponse.json().data.createCategory
			.id as string;

		const createTransactionResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${ownerToken}` },
			payload: {
				query: CREATE_TRANSACTION_MUTATION,
				variables: {
					input: {
						description: 'Owner transaction',
						amount: 1000,
						type: 'expense',
						date: new Date().toISOString(),
						categoryId,
					},
				},
			},
		});
		const transactionId = createTransactionResponse.json().data
			.createTransaction.id as string;

		const updateResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${otherToken}` },
			payload: {
				query: UPDATE_TRANSACTION_MUTATION,
				variables: {
					input: {
						id: transactionId,
						description: 'Other edit',
						amount: 1800,
						type: 'income',
						date: new Date().toISOString(),
						categoryId,
					},
				},
			},
		});

		const body = updateResponse.json();
		expect(body.data.updateTransaction).toBeNull();
		expect(body.errors[0].extensions.code).toBe('NOT_FOUND');
	});

	it('updateTransaction returns NOT_FOUND for non-existent transaction id', async () => {
		const signUpResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Update not found',
						email: `update-not-found-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});
		const token = signUpResponse.json().data.signUp.token as string;

		const createCategoryResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${token}` },
			payload: {
				query: CREATE_CATEGORY_MUTATION,
				variables: {
					input: {
						title: `NF category ${Date.now()}`,
						icon: 'utensils',
						description: 'NF',
						color: 'orange',
					},
				},
			},
		});
		const categoryId = createCategoryResponse.json().data.createCategory
			.id as string;

		const updateResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${token}` },
			payload: {
				query: UPDATE_TRANSACTION_MUTATION,
				variables: {
					input: {
						id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
						description: 'Missing transaction',
						amount: 1800,
						type: 'income',
						date: new Date().toISOString(),
						categoryId,
					},
				},
			},
		});

		const body = updateResponse.json();
		expect(body.data.updateTransaction).toBeNull();
		expect(body.errors[0].extensions.code).toBe('NOT_FOUND');
	});

	it('updateTransaction returns NOT_FOUND for category outside ownership', async () => {
		const ownerSignUp = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Owner category validation',
						email: `owner-category-validation-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});
		const ownerToken = ownerSignUp.json().data.signUp.token as string;

		const otherSignUp = await app.inject({
			method: 'POST',
			url: '/graphql',
			payload: {
				query: SIGN_UP_MUTATION,
				variables: {
					input: {
						name: 'Other category validation',
						email: `other-category-validation-${Date.now()}@example.com`,
						password: 'password123',
					},
				},
			},
		});
		const otherToken = otherSignUp.json().data.signUp.token as string;

		const ownerCategoryResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${ownerToken}` },
			payload: {
				query: CREATE_CATEGORY_MUTATION,
				variables: {
					input: {
						title: `Owner update category ${Date.now()}`,
						icon: 'utensils',
						description: 'Owner',
						color: 'orange',
					},
				},
			},
		});
		const ownerCategoryId = ownerCategoryResponse.json().data.createCategory
			.id as string;

		const otherCategoryResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${otherToken}` },
			payload: {
				query: CREATE_CATEGORY_MUTATION,
				variables: {
					input: {
						title: `Other update category ${Date.now()}`,
						icon: 'briefcase-business',
						description: 'Other',
						color: 'green',
					},
				},
			},
		});
		const otherCategoryId = otherCategoryResponse.json().data.createCategory
			.id as string;

		const createTransactionResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${ownerToken}` },
			payload: {
				query: CREATE_TRANSACTION_MUTATION,
				variables: {
					input: {
						description: 'Owner transaction',
						amount: 1000,
						type: 'expense',
						date: new Date().toISOString(),
						categoryId: ownerCategoryId,
					},
				},
			},
		});
		const transactionId = createTransactionResponse.json().data
			.createTransaction.id as string;

		const updateResponse = await app.inject({
			method: 'POST',
			url: '/graphql',
			headers: { authorization: `Bearer ${ownerToken}` },
			payload: {
				query: UPDATE_TRANSACTION_MUTATION,
				variables: {
					input: {
						id: transactionId,
						description: 'Owner tries foreign category',
						amount: 2000,
						type: 'expense',
						date: new Date().toISOString(),
						categoryId: otherCategoryId,
					},
				},
			},
		});

		const body = updateResponse.json();
		expect(body.data.updateTransaction).toBeNull();
		expect(body.errors[0].extensions.code).toBe('NOT_FOUND');
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
