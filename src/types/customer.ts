import type { Nullable } from 'types/generic'

export interface Customer {
  id?: string;
  firstName: string;
  lastName: string;
  homeAddress: string;
  birthday: Date | string;
}

export interface CustomersState {
  customers: {
    customers: Nullable<Customer[]>,
    customer: Nullable<Customer>,
  };
}