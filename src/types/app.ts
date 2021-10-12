import { Customer } from './customer';

export interface AppState {
  customers: {
    customers: Customer[],
    customer: Customer,
    deleted: boolean,
  }, 
  page: {
    currentPage: number
  },
}
