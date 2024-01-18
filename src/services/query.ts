const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

interface PaginationQuery {
  page?: number;
  limit?: number;
}

function getPagination(query: PaginationQuery): { skip: number; take: number } {
  console.log({ query });

  const page = Math.abs(query.page || DEFAULT_PAGE_NUMBER);
  const take = Math.abs(query.limit || DEFAULT_PAGE_LIMIT);
  const skip = (page - 1) * take;

  console.log({ page });
  console.log({ skip });
  console.log({ take });

  return { skip, take };
}

export { getPagination };
