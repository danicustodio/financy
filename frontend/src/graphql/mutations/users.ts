export const UPDATE_ME_MUTATION = `
  mutation UpdateMe($input: UpdateMeInput!) {
    updateMe(input: $input) {
      id
      name
      email
    }
  }
`;
