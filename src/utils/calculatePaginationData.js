export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = totalPages > page;
  const hasPreviousPage =
    page !== 1 && totalPages !== 0 && page - totalPages <= 1 ? true : false;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
