export const CREATE_TRANSACTION_MUTATION = `
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
    }
  }
`;
