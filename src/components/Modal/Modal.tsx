import React from 'react';
import './Modal.css';
import { useAppSelector } from '../../hooks/useTypedRedux';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({  isOpen,  onClose, title, children }) => {
  
  const theme = useAppSelector((state) => state.theme.mode);

  if (!isOpen) return null;

  return (
    <div 
      className={`modal-overlay ${theme}`}
      onClick={onClose}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="modal-title">{title}</h3>}
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};