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
});
