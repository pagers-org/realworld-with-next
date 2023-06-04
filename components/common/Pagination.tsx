import { type MouseEvent, useCallback } from 'react';

import { mutate } from 'swr';

import { usePageDispatch, usePageState } from '../../lib/context/PageContext';
import { getPageInfo, getRange } from '../../lib/utils/calculatePagination';
import Maybe from './Maybe';

interface PaginationProps {
  total: number;
  limit: number;
  pageCount: number;
  currentPage: number;
  lastIndex: number;
  fetchURL: string;
}

const Pagination = ({
  total,
  limit,
  pageCount,
  currentPage,
  lastIndex,
  fetchURL,
}: PaginationProps) => {
  const page = usePageState();
  const setPage = usePageDispatch();

  const { firstPage, lastPage, hasPreviousPage, hasNextPage } = getPageInfo({
    limit,
    pageCount,
    total,
    page: currentPage,
  });
  const pages = total > 0 ? getRange(firstPage, lastPage) : [];

  const handleClick = useCallback((e: MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    e.preventDefault();
    setPage(index);
    mutate(fetchURL);
  }, []);

  const handleFirstClick = useCallback((e: MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setPage(0);
    mutate(fetchURL);
  }, []);

  const handlePrevClick = useCallback((e: MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setPage(page - 1);
    mutate(fetchURL);
  }, []);

  const handleNextClick = useCallback((e: MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setPage(page + 1);
    mutate(fetchURL);
  }, []);

  const handleLastClick = useCallback((e: MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setPage(lastIndex);
    mutate(fetchURL);
  }, []);

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item" onClick={handleFirstClick}>
          <a className="page-link">{`<<`}</a>
        </li>
        <Maybe test={hasPreviousPage}>
          <li className="page-item" onClick={handlePrevClick}>
            <a className="page-link">{`<`}</a>
          </li>
        </Maybe>

        {pages.map((page) => {
          const isCurrent = !currentPage ? page === 0 : page === currentPage;
          return (
            <li
              key={page.toString()}
              className={isCurrent ? 'page-item active' : 'page-item'}
              onClick={(e) => handleClick(e, page)}
            >
              <a className="page-link">{page + 1}</a>
            </li>
          );
        })}
        <Maybe test={hasNextPage}>
          <li className="page-item" onClick={handleNextClick}>
            <a className="page-link">{`>`}</a>
          </li>
        </Maybe>
        <li className="page-item" onClick={handleLastClick}>
          <a className="page-link">{`>>`}</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
