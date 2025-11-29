import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, title, message, onConfirm, confirmText = 'Sí', cancelText = 'No' }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          {onConfirm ? (
            <>
              <button className="modal-btn confirm" onClick={onConfirm}>
                {confirmText}
              </button>
              <button className="modal-btn cancel" onClick={onClose}>
                {cancelText}
              </button>
            </>
          ) : (
            <button className="modal-btn ok" onClick={onClose}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;