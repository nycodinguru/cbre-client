import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  customers: null,
  customer: null,
  deleted: null,
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    getCustomersSuccess: (state, action) => {
      const customersData = action.payload;
      state.customers = customersData;
    },
    getCustomerSuccess: (state, action) => {
      const customersData = action.payload;
      state.customer = customersData;
    },
    resetCusomterState: (state) => {
      state.customer = null;
    },
    updateCustomerSuccess: (state, action) => {
      const customerData = action.payload
      let customersData = state.customers
      //@ts-ignore
      state.customers = customersData?.map((customer) => {
        let _customer = customer
        if (customer.id === customerData.id) _customer = customerData
        return _customer
      })
    },
    addCustomerSuccess: (state, action) => {
      const customerData = action.payload
      //@ts-ignore
      let customersData = state.customers?.length ? state.customers : []
      customersData?.pop()
      //@ts-ignore
      customersData?.unshift(customerData)
      //@ts-ignore
      state.customers = customersData
    },
    deleteCustomerSuccess: (state) => {
      //@ts-ignore
      state.deleted = true
    },
    deleteCustomerReset: (state) => {
      //@ts-ignore
      state.deleted = false
    },
  },
});

export const {
  getCustomersSuccess,
  getCustomerSuccess,
  resetCusomterState,
  updateCustomerSuccess,
  addCustomerSuccess,
  deleteCustomerSuccess,
  deleteCustomerReset,
} = customersSlice.actions

export default customersSlice.reducer
