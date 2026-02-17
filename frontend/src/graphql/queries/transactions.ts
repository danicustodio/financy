export const LIST_TRANSACTIONS_QUERY = `
  query ListTransactions {
    transactions {
      id
      description
      amount
      type
      date
      category {
        id
        title
        icon
        color
      }
    }
  }
`;
