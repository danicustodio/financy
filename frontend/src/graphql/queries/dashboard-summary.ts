export const DASHBOARD_SUMMARY_QUERY = `
  query DashboardSummary($month: Int, $year: Int) {
    dashboardSummary(month: $month, year: $year) {
      totalBalanceCents
      monthlyIncomeCents
      monthlyExpenseCents
    }
  }
`;
