import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DateTime } from "luxon"

import "./styles.scss"
import { Table } from "components"
import { Modal, Toggle, Button } from "components/ui"
import { sagaActions } from "redux/sagas/sagaActions"
import { AppState } from "types/app"
import { customerTableHeaders } from "constants/index"
import type { Customer } from "types/customer"
import { CustomerForm } from "./customer-form"
import { nextPage, prevPage } from "redux/slices/pageSlice"
import { deleteCustomerReset } from "redux/slices/customersSlice"

const Customers: React.FC<any> = () => {
  const dispatch = useDispatch()
  const [customerData, setCustomerData] = useState<Customer[] | null>(null)
  const [renderDetailModal, setRenderDetailModal] = useState<boolean>(false)
  const [header, setHeader] = useState<string>("")
  const customersState = useSelector(
    (state: AppState) => state?.customers?.customers
  )
  const customerState = useSelector(
    (state: AppState) => state?.customers?.customer
  )
  const currentPage = useSelector((state: AppState) => state?.page?.currentPage)
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const deleted = useSelector((state: AppState) => state?.customers?.deleted)

  useEffect(() => {
    customersState && formatData()
  }, [customersState])

  useEffect(() => {
    if (deleted) {
      dispatch({
        payload: {
          page: currentPage || 0,
        },
        type: sagaActions.GET_CUSTOMERS,
      })
      dispatch(deleteCustomerReset())
    }
  }, [deleted])

  useEffect(() => {
    dispatch({
      payload: {
        page: currentPage || 0,
      },
      type: sagaActions.GET_CUSTOMERS,
    })
  }, [])

  const getCustomer = (id: string) => {
    setHeader("Customer Detail")
    dispatch({
      payload: { id: id },
      type: sagaActions.GET_CUSTOMER,
    })
  }

  useEffect(() => {
    dispatch({
      payload: {
        page: currentPage || 0,
      },
      type: sagaActions.GET_CUSTOMERS,
    })
  }, [currentPage])

  const createCustomer = () => {
    setHeader("Add Customer")
    setRenderDetailModal(true)
  }

  useEffect(() => {
    customerState &&
      Object.keys(customerState)?.length &&
      setRenderDetailModal(true)
  }, [customerState])

  const formatData = () => {
    let customerDataFormatted = customersState?.map((customer: Customer) => {
      let _customer = Object.assign({}, customer)
      _customer.birthday = DateTime.fromISO(
        customer.birthday as string
      ).toFormat("ccc, LLL dd yyyy")
      return _customer
    })
    //@ts-ignore
    setCustomerData(customerDataFormatted)
  }

  const toggleDarkMode = () => {
    document.querySelector("html")?.classList.toggle("dark")
    setDarkMode(!darkMode)
  }

  return (
    <div className="customers">
      <h1 className="customers__header">Customers</h1>
      <div>
        <div className="customers__action-bar">
          <Button
            disabled={renderDetailModal}
            label={"Add Customer"}
            onClick={createCustomer}
          />
        </div>
        <Table
          data={customerData}
          headers={customerTableHeaders}
          onClickRow={getCustomer}
        />
      </div>
      {renderDetailModal && (
        <Modal
          header={header}
          clickOutsideToClose={true}
          handleClickX={() => setRenderDetailModal(false)}>
          <CustomerForm
            setRenderDetailModal={setRenderDetailModal}
            customer={customerState || {}}
          />
        </Modal>
      )}
      <div className="customers__action-bar-bottom">
        <Toggle label={"Dark Mode"} value={darkMode} onClick={toggleDarkMode} />
        <div className="customers__action-bar-bottom--right">
          <Button
            disabled={!currentPage}
            label={"PREV"}
            onClick={() => dispatch(prevPage())}
          />
          <Button
            disabled={customersState?.length < 10 || !customersState}
            label={"NEXT"}
            onClick={() => dispatch(nextPage())}
          />
        </div>
      </div>
    </div>
  )
}

export default Customers
