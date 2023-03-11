import React from 'react'
import ReactDOM from 'react-dom'
import './ModalTwo.css'

const ModalTwo = ({ visible, children, closeModal }) => {

  if (!visible) {
    return null
  }
  return ReactDOM.createPortal(
    <div className="modal-overlayfirasRomaneh" onClick={closeModal}>
      <div className="modalfirasRomaneh" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.querySelector('#modal-root')
  )
}

export default ModalTwo