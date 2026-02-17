export const CATEGORIES_SUMMARY_QUERY = `
  query CategoriesSummary {
    categoriesSummary {
      totalCategories
      totalTransactions
      mostUsedCategory {
        id
        title
        icon
        color
        transactionCount
      }
    }
  }
`;
