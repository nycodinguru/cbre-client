import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { sagaActions } from "redux/sagas/sagaActions"
import { AppState } from "types/app"
import "./styles.scss"
import type { Customer } from "types/customer"
import { TextField, DatePicker, Button } from "components/ui"
import { resetCusomterState } from "redux/slices/customersSlice"

interface CustomerFormProps {
  customer?: Customer
  setRenderDetailModal: React.Dispatch<React.SetStateAction<boolean>>
}

type Mode = "view" | "edit" | "add" | ""

export const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  setRenderDetailModal,
}) => {
  const dispatch = useDispatch()
  const [customerState, setCustomerState] = useState<Customer | {}>({})
  const [mode, setMode] = useState<Mode>("add")
  const [isValid, setIsValid] = useState<boolean>(false)
  const deleted = useSelector((state: AppState) => state?.customers?.deleted)
  const customerStateRedux = useSelector(
    (state: AppState) => state?.customers?.customer
  )

  useEffect(() => {
    if (customer && Object.keys(customer)?.length) {
      populateCustomerState()
      setMode("view")
    }
  }, [customer])

  useEffect(() => {
    validateData()
  }, [mode])

  useEffect(() => {
    deleted && setRenderDetailModal(false)
  }, [deleted])

  const populateCustomerState = () => {
    let _customer = {}
    //@ts-ignore
    for (let [key, value] of Object.entries(customer)) {
      _customer = {
        ..._customer,
        [key]: value,
      }
    }
    setCustomerState(_customer)
  }

  const handleUpdateField = (field: keyof Customer, value: string): void => {
    let _customer = { ...customerState }
    _customer = {
      ..._customer,
      [field]: value,
    }
    setCustomerState(_customer)
  }

  useEffect(() => {
    //@ts-ignore
    Object.keys(customer)?.length && setMode("view")

    return () => {
      dispatch(resetCusomterState())
    }
  }, [])

  const validateData = () => {
    Object.keys(customerState)?.length >= 4 && setIsValid(true)
    for (let [key, value] of Object.entries(customerState)) {
      if (!value) setIsValid(false)
    }
  }

  const updateCustomer = () => {
    dispatch({
      payload: {
        customer: customerState,
      },
      type: sagaActions.UPDATE_CUSTOMER,
    })
  }

  const addCustomer = () => {
    dispatch({
      payload: {
        customer: customerState,
      },
      type: sagaActions.ADD_CUSTOMER,
    })
    setRenderDetailModal(false)
  }

  const deleteCustomer = () => {
    dispatch({
      payload: {
        //@ts-ignore
        id: customerState.id,
      },
      type: sagaActions.DELETE_CUSTOMER,
    })
  }

  useEffect(() => {
    validateData()
  }, [customerState])

  return (
    <div className="customer__form">
      <TextField
        disabled={!!(mode === "view")}
        //@ts-ignore
        onChange={(value: string) => handleUpdateField("firstname", value)}
        label={"First Name"}
        //@ts-ignore
        value={customerState?.firstname}
      />
      <TextField
        disabled={!!(mode === "view")}
        //@ts-ignore
        onChange={(value: string) => handleUpdateField("lastname", value)}
        label={"Last Name"}
        //@ts-ignore
        value={customerState?.lastname}
      />
      <TextField
        disabled={!!(mode === "view")}
        //@ts-ignore
        onChange={(value: string) => handleUpdateField("homeaddress", value)}
        label={"Address"}
        //@ts-ignore
        value={customerState?.homeaddress}
      />
      <DatePicker
        disabled={!!(mode === "view")}
        label={"Birthday"}
        field={"birthday"}
        //@ts-ignore
        selected={Date.parse(customerState?.birthday)}
        onSelect={(value: Date) =>
          handleUpdateField("birthday", value.toString())
        }
        onChange={(field: string, value: string) =>
          //@ts-ignore
          handleUpdateField(field, value.toString())
        }
      />
      <div className="customer__form-actions">
        {mode === "view" && (
          <Button label={"Edit"} onClick={() => setMode("edit")} />
        )}
        {mode === "edit" && (
          <>
            <Button
              className="delete-button"
              primary={false}
              label={"delete"}
              onClick={deleteCustomer}
            />
            <Button label={"Cancel"} onClick={() => setMode("view")} />
            <Button
              disabled={!isValid}
              label={"Save"}
              onClick={updateCustomer}
            />
          </>
        )}
        {mode === "add" && (
          <Button
            disabled={!isValid}
            label={"Add Customer"}
            onClick={addCustomer}
          />
        )}
      </div>
    </div>
  )
}
