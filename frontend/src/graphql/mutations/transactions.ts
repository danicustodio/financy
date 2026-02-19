export const CREATE_TRANSACTION_MUTATION = `
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
    }
  }
`;

export const DELETE_TRANSACTION_MUTATION = `
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;
