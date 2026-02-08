import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { cn } from '@/lib/utils';
import type { PaginationProps } from './pagination.types';
import { paginationButtonVariants } from './pagination.variants';

export const Pagination = ({
	currentPage,
	totalPages,
	totalResults,
	pageSize,
	onPageChange,
}: PaginationProps) => {
	const startItem = (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalResults);

	const handlePrevious = () => {
		if (currentPage > 1 && onPageChange) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages && onPageChange) {
			onPageChange(currentPage + 1);
		}
	};

	const handlePageClick = (page: number) => {
		if (onPageChange) {
			onPageChange(page);
		}
	};

	// Generate page numbers to show (simplified: show up to 3 pages)
	const getVisiblePages = () => {
		const pages: number[] = [];
		const maxVisible = 3;
		let start = Math.max(1, currentPage - 1);
		const end = Math.min(totalPages, start + maxVisible - 1);

		if (end - start + 1 < maxVisible) {
			start = Math.max(1, end - maxVisible + 1);
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		return pages;
	};

	return (
		<div className="flex items-center justify-between px-6 py-5">
			<span className="text-sm text-financy-gray-700">
				{startItem} a {endItem} | {totalResults} resultados
			</span>

			<div className="flex items-center gap-2">
				<IconButton
					icon={<ChevronLeft className="w-4 h-4" />}
					variant="outline"
					onClick={handlePrevious}
					disabled={currentPage === 1}
					aria-label="Página anterior"
				/>

				{getVisiblePages().map((page) => (
					<button
						key={page}
						type="button"
						onClick={() => handlePageClick(page)}
						className={cn(
							paginationButtonVariants({
								state: page === currentPage ? 'active' : 'default',
							}),
						)}
					>
						{page}
					</button>
				))}

				<IconButton
					icon={<ChevronRight className="w-4 h-4" />}
					variant="outline"
					onClick={handleNext}
					disabled={currentPage === totalPages}
					aria-label="Próxima página"
				/>
			</div>
		</div>
	);
};
