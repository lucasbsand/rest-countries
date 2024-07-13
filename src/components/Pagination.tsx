'use client';

import { generatePagination } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    const isNotFiltering =
      !searchParams.has('search') && !searchParams.has('region');
    const isMoreThanTotal = currentPage > totalPages;
    const isLessThanTotal = currentPage <= 0;

    if ((isMoreThanTotal && isNotFiltering) || isLessThanTotal) {
      replace('?page=1');
    }
  }, [currentPage, totalPages, searchParams, replace]);

  return (
    <div className='flex flex-wrap justify-center mx-auto mt-12 w-fit'>
      <Link
        href={createPageURL(currentPage - 1)}
        aria-label='Previous Page'
        className={clsx(
          'grid place-items-center w-10 h-10 rounded-s text-light-text bg-dark-text-light-elements dark:text-dark-text-light-elements dark:bg-dark-elements hover:brightness-95 dark:hover:brightness-125 focus:ring-0 focus:brightness-95 dark:focus:brightness-125',
          currentPage <= 1 &&
            'opacity-50 hover:brightness-100 dark:hover:brightness-100 pointer-events-none'
        )}
      >
        <ChevronLeftIcon className='size-4' />
      </Link>
      {pages.map((page, index) => (
        <Link
          href={createPageURL(page)}
          aria-label={page !== '...' ? `Page ${page}` : 'Others pages'}
          key={index}
          className={clsx(
            'grid place-items-center w-10 h-10 text-light-text bg-dark-text-light-elements dark:text-dark-text-light-elements dark:bg-dark-elements hover:brightness-95 dark:hover:brightness-125 focus:ring-0 focus:brightness-95 dark:focus:brightness-125',
            currentPage === page && 'brightness-95 dark:brightness-125',
            page === '...' &&
              'opacity-50 hover:brightness-100 dark:hover:brightness-100 pointer-events-none'
          )}
        >
          {page}
        </Link>
      ))}
      <Link
        href={createPageURL(currentPage + 1)}
        aria-label='Next Page'
        className={clsx(
          'grid place-items-center w-10 h-10 rounded-e text-light-text bg-dark-text-light-elements dark:text-dark-text-light-elements dark:bg-dark-elements hover:brightness-95 dark:hover:brightness-125 focus:ring-0 focus:brightness-95 dark:focus:brightness-125',
          currentPage >= totalPages &&
            'opacity-50 hover:brightness-100 dark:hover:brightness-100 pointer-events-none'
        )}
      >
        <ChevronRightIcon className='size-4' />
      </Link>
    </div>
  );
}

export default Pagination;
