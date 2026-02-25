'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

interface MiniPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function MiniPagination({ currentPage, totalPages }: MiniPaginationProps) {
  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  return (
    <Pagination className="pb-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={`/?page=${prevPage}`}
            size="icon"
            aria-label="Go to previous page"
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          >
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <p className="text-muted-foreground text-sm" aria-live="polite">
            Page <span className="text-foreground font-medium">{currentPage}</span> of{' '}
            <span className="text-foreground font-medium">{totalPages}</span>
          </p>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={`/?page=${nextPage}`}
            size="icon"
            aria-label="Go to next page"
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
          >
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
