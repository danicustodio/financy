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

export const REQUEST_PASSWORD_RESET_MUTATION = `
	mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
		requestPasswordReset(input: $input)
	}
`;

export const RESET_PASSWORD_MUTATION = `
	mutation ResetPassword($input: ResetPasswordInput!) {
		resetPassword(input: $input)
	}
`;
