import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

const Modal = ({ visible, children, closeModal }) => {

  if (!visible) {
    return null
  }
  return ReactDOM.createPortal(
    <div className="modal-overlayfiras" onClick={closeModal}>
      <div className="modalfiras" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.querySelector('#modal-root')
  )
}

export default Modal