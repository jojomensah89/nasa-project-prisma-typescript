export interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  target: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}
