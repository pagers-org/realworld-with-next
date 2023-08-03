import { type MouseEvent, useCallback } from 'react';
import { getPageInfo, getRange } from './Pagination.utils';

type PaginationProps = {
  page: number;
  onChangePage: (page: number) => void;
  total: number;
  limit: number;
  pageCount: number;
  currentPage: number;
  lastIndex: number;
};

const Pagination = ({
  page,
  onChangePage,
  total,
  limit,
  pageCount,
  currentPage,
  lastIndex,
}: PaginationProps) => {
  const { firstPage, lastPage, hasPreviousPage, hasNextPage } = getPageInfo({
    limit,
    pageCount,
    total,
    page: currentPage,
  });
  const pages = total > 0 ? getRange(firstPage, lastPage) : [];

  const handleClick = useCallback(
    (index: number) => (event: MouseEvent<HTMLLIElement>) => {
      event.preventDefault();
      onChangePage(index);
    },
    [],
  );

  const handleFirstClick = useCallback((e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    onChangePage(1);
  }, []);

  const handlePrevClick = useCallback((e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (page === 1) return;
    onChangePage(page - 1);
  }, []);

  const handleNextClick = useCallback((event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    if (page === lastIndex) return;
    onChangePage(page + 1);
  }, []);

  const handleLastClick = useCallback((event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onChangePage(lastIndex);
  }, []);

  return (
    <nav style={{ display: 'flex', justifyContent: 'center' }}>
      <ul className="pagination cursor-pointer">
        <li className="page-item" onClick={handleFirstClick}>
          <a className="page-link">{`<<`}</a>
        </li>
        {hasPreviousPage && (
          <li className="page-item" onClick={handlePrevClick}>
            <a className="page-link">{`<`}</a>
          </li>
        )}
        {pages.map((page) => {
          const isCurrent = !currentPage ? page === 1 : page === currentPage;
          return (
            <li
              key={page.toString()}
              className={isCurrent ? 'page-item active' : 'page-item'}
              onClick={handleClick(page)}
            >
              <a className="page-link">{page}</a>
            </li>
          );
        })}
        {hasNextPage && (
          <li className="page-item" onClick={handleNextClick}>
            <a className="page-link">{`>`}</a>
          </li>
        )}
        <li className="page-item" onClick={handleLastClick}>
          <a className="page-link">{`>>`}</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
