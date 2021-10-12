import React from "react"

import "./styles.scss"

export interface ToggleProps {
  label: string
  value: boolean
  onClick: (state?: boolean) => void
}

export const Toggle: React.FC<ToggleProps> = ({ label, value, onClick }) => {
  return (
    <div className="toggle">
      <p className="toggle__label">{label}</p>
      <div
        className={`toggle__outer ${value ? "on" : ""}`}
        onClick={() => onClick(!value)}>
        <div className="toggle__switch"></div>
      </div>
    </div>
  )
}
