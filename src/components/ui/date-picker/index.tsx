import React from "react"
import ReactDatePicker from "react-datepicker"
import { DateTime } from "luxon"

import "./styles.scss"

interface DatePickerProps {
  label: string
  onChange: (field: string, value: string) => void
  field: string
  selected: Date
  disabled: boolean
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  onChange,
  field,
  selected,
  disabled,
}) => {
  return (
    <div className={`date-picker ${disabled ? "disabled" : ""}`}>
      <div className="date-picker__label">{label}</div>
      <ReactDatePicker
        disabled={disabled}
        selected={selected}
        onSelect={(value: Date) =>
          onChange(field, new Date(value).toISOString().substr(0, 10))
        }
        onChange={(value: Date) =>
          onChange(field, new Date(value).toISOString().substr(0, 10))
        }
      />
    </div>
  )
}
