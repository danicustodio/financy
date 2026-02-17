export const LIST_CATEGORIES_QUERY = `
  query ListCategories {
    categories {
      id
      name
      icon
      description
      color
    }
  }
`;
