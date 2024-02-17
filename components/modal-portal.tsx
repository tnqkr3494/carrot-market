import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-20 bg-slate-300" />
      <div className="fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-orange-500 p-9">
        <button onClick={onClose}>모달 닫기</button>
        {children}
      </div>
    </>,
    document.getElementById("global-modal") as HTMLElement,
  );
};

export default Modal;
