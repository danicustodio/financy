export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalResults: number;
	pageSize: number;
	onPageChange?: (page: number) => void;
}
