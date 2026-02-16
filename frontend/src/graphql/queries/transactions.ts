export const LIST_TRANSACTIONS_QUERY = `
  query ListTransactions {
    transactions {
      id
      description
      amountCents
      type
      date
      category {
        id
        name
        color
      }
    }
  }
`;
