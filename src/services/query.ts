import { PaginationQuery } from "../types/launches";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query: PaginationQuery): { skip: number; take: number } {
  const page = Math.abs(query.page || DEFAULT_PAGE_NUMBER);
  const take = Math.abs(query.limit || DEFAULT_PAGE_LIMIT);
  const skip = (page - 1) * take;

  return { skip, take };
}

export { getPagination };
