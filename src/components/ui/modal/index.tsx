import React, { useEffect, useState, useRef } from "react"

import "./styles.scss"
import { Icon } from "components/ui"

export interface ModalProps {
  header?: string
  handleClickX: () => void
  clickOutsideToClose?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  header,
  handleClickX,
  clickOutsideToClose,
  ...props
}) => {
  const [isRendered, setIsRendered] = useState<boolean>(false)
  const _modal = useRef<HTMLDivElement>(null)

  useEffect(() => {
    //@ts-ignore
    document.querySelector("html").style.overflow = "hidden"
    setTimeout(() => {
      setIsRendered(true)
    }, 50)

    return () => {
      //@ts-ignore
      document.querySelector("html").style.overflow = "auto"
    }
  }, [])

  const handleClose = () => {
    setIsRendered(false)
    setTimeout(() => {
      handleClickX()
    }, 150)
  }

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    clickOutsideToClose &&
      _modal.current &&
      !_modal.current.contains(e.target as Node) &&
      handleClose()
  }

  return (
    <div className="modal" onClick={(e) => handleOutsideClick(e)}>
      <div
        className={`modal-background ${
          clickOutsideToClose ? "point-on-hover" : ""
        }`}>
        <div
          className={`modal-content ${isRendered ? "is-open" : ""}`}
          ref={_modal}>
          <div className="modal__x-container">
            <Icon
              iconClass="x"
              color="var(--color-primary)"
              onClick={handleClose}
            />
          </div>
          <div className="modal__header">
            <h1 className="modal__header">{header}</h1>
          </div>
          <div className="modal__content">{props.children}</div>
        </div>
      </div>
    </div>
  )
}
