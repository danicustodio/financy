export const LIST_TRANSACTIONS_QUERY = `
  query ListTransactions($filter: TransactionFilter, $pagination: TransactionPagination) {
    transactions(filter: $filter, pagination: $pagination) {
      totalCount
      items {
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
  }
`;
