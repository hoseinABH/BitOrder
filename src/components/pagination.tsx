// Common components
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
// Hooks
import { useMemo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 4;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="mt-6 flex items-center justify-between gap-1 select-none md:justify-center">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronRight className="size-4" />
      </Button>

      <span className="flex gap-1 md:hidden">
        صفحه <span className="font-sans">{currentPage}</span> از{' '}
        <span className="font-sans">{totalPages}</span>
      </span>
      <div className="hidden items-center justify-center gap-1 md:flex">
        {pageNumbers.map((pageNumber, index) =>
          pageNumber === -1 ? (
            <Button key={`ellipsis-${index}`} variant="outline" size="icon" disabled>
              ...
            </Button>
          ) : (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? 'default' : 'outline'}
              size="icon"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          ),
        )}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronLeft className="size-4" />
      </Button>
    </div>
  );
}
