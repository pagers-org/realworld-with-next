type GetPageInfo = (params: { limit: number; pageCount: number; total: number; page: number }) => {
  previousPage: number;
  firstPage: number;
  lastPage: number;
  hasNextPage: boolean;
  nextPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
};

export const getRange = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

export const getPageInfo: GetPageInfo = ({ limit, pageCount, total, page }) => {
  const totalPages = Math.floor(total / limit);
  const currentPage = page > totalPages ? totalPages : page;

  let firstPage = Math.max(1, currentPage - Math.floor(pageCount / 2));
  let lastPage = Math.min(totalPages, currentPage + Math.floor(pageCount / 2));

  if (lastPage - firstPage + 1 < pageCount) {
    if (currentPage < totalPages / 2) {
      lastPage = Math.min(totalPages, lastPage + (pageCount - (lastPage - firstPage)));
    } else {
      firstPage = Math.max(1, firstPage - (pageCount - (lastPage - firstPage)));
    }
  }

  if (lastPage - firstPage + 1 > pageCount) {
    if (currentPage > totalPages / 2) {
      firstPage = firstPage + 1;
    } else {
      lastPage = lastPage - 1;
    }
  }

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return {
    firstPage,
    lastPage,
    previousPage,
    nextPage,
    hasPreviousPage,
    hasNextPage,
    totalPages,
  };
};
