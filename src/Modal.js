import React from 'react';
import ReactDOM from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34, 34, 34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  color: '#fff', 
  padding: '20px',
  borderRadius: '8px', 
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000,
};

const CLOSE_BUTTON_STYLE = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '1.5rem',
  cursor: 'pointer',
};

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button style={CLOSE_BUTTON_STYLE} onClick={onClose}>
          X
        </button>
        <div style={{ color: '#fff' }}>{children}</div>
      </div>
    </>,
    document.getElementById('cart-root')
  );
};

export default Modal;
