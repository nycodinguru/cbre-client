import React from "react"

import "./styles.scss"

export interface IconProps {
  iconClass: string
  size?: string
  color: string
  onClick?: () => void
  className?: string
}

export const Icon: React.FC<IconProps> = ({
  iconClass,
  size = "1rem",
  color = "transparent",
  className,
  onClick,
}) => {
  return (
    <span
      onMouseDown={onClick || onClick}
      className={["icon", iconClass, className].join(" ")}
      style={{ height: size, width: size, backgroundColor: color }}></span>
  )
}
