export const SIGN_UP_MUTATION = `
	mutation SignUp($input: SignUpInput!) {
		signUp(input: $input) {
			token
			user {
				id
				name
				email
			}
		}
	}
`;

export const LOGIN_MUTATION = `
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			token
			user {
				id
				name
				email
			}
		}
	}
`;
