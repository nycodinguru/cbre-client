import React, { useState, useRef } from "react"

import "./styles.scss"

interface TextFieldProps {
  onChange: (value: string) => void
  label: string
  value: string
  disabled: boolean
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  disabled,
}) => {
  const inputField = useRef<any>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <div
      className={`text-field
        ${value?.length || isFocused ? "text-field--active" : ""}
        ${disabled ? "disabled" : ""}
        `}>
      <div
        className="text-field__label"
        onClick={() => inputField.current.focus()}>
        {label}
      </div>
      <input
        disabled={disabled}
        value={value || ""}
        aria-label={label}
        ref={inputField}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.currentTarget.value)}
        onKeyUp={(e) => onChange(e.currentTarget.value)}
        className="text-field__input"
      />
    </div>
  )
}
