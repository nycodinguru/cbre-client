import "./styles.scss"

export interface ButtonProps {
  className?: string
  label: any
  disabled?: boolean
  onClick: (arg0?: any) => void
  iconClass?: string
  round?: boolean
  primary?: boolean
  iconColor?: string
}

export const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,
  onClick,
  primary = true,
  iconColor = "#fff",
  className,
}) => {
  return (
    <div
      className={`
        button 
        ${disabled ? "disabled" : ""}
        ${primary ? "primary" : ""}
        ${className ? className : ""}
        `}
      onClick={() => {
        !disabled && onClick()
      }}>
      {label}
    </div>
  )
}
