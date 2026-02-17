export const LIST_CATEGORIES_QUERY = `
  query ListCategories {
    categories {
      id
      title
      icon
      description
      color
      transactionCount
    }
  }
`;
