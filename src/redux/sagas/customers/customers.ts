import { call, put, takeLatest } from 'redux-saga/effects'

import api from 'api/Api'
import {
  getCustomersSuccess,
  getCustomerSuccess,
  updateCustomerSuccess,
  addCustomerSuccess,
  deleteCustomerSuccess,
} from 'redux/slices/customersSlice'
import { sagaActions } from 'redux/sagas/sagaActions'

function* getCustomers(action: any){
  const { page } = action.payload
  try {
    const url = `/customers/${page}`
    //@ts-ignore
    const response = yield call(api.utility.get, url)
    const { data } = response
    yield put(getCustomersSuccess(data))
  } catch (error) {
    console.error(error)
  }
}

function* getCustomer(action: any){
  try {
    const { id } = action.payload
    const url = `/customer/${id}`
    //@ts-ignore
    const response = yield call(api.utility.get, url)
    const { data } = response
    yield put(getCustomerSuccess(data))
  } catch (error) {
    console.error(error)
  }
}

function* updateCustomer(action: any){
  try {
    const { customer } = action.payload
    const url = `/customer`
    //@ts-ignore
    const response = yield call(api.utility.put, url, customer)
    const { data } = response
    yield put(updateCustomerSuccess(data))
  } catch (error) {
    console.error(error)
  }
}

function* addCustomer(action: any){
  try {
    const { customer } = action.payload
    const url = `/customer`
    //@ts-ignore
    const response = yield call(api.utility.post, url, customer)
    const { data } = response
    yield put(addCustomerSuccess(data))
  } catch (error) {
    console.error(error)
  }
}

function* deleteCustomer(action: any){
  try {
    const { id } = action.payload
    const url = `/customer/${id}`
    //@ts-ignore
    const response = yield call(api.utility.delete, url)
    const { data } = response
    yield put(deleteCustomerSuccess())
  } catch (error) {
    console.error(error)
  }
}

export function* watchGetCustomers() {
  yield takeLatest(sagaActions.GET_CUSTOMERS, getCustomers)
}

export function* watchGetCustomer() {
  yield takeLatest(sagaActions.GET_CUSTOMER, getCustomer)
}

export function* watchUpdateCustomer() {
  yield takeLatest(sagaActions.UPDATE_CUSTOMER, updateCustomer)
}

export function* watchAddCustomer() {
  yield takeLatest(sagaActions.ADD_CUSTOMER, addCustomer)
}

export function* watchDeleteCustomer() {
  yield takeLatest(sagaActions.DELETE_CUSTOMER, deleteCustomer)
}
