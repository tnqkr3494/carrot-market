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
      <div className="fixed bottom-0 left-0 right-0 top-0 z-20 bg-black bg-opacity-50" />
      <div className="fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="relative flex h-72 w-72 flex-col items-center justify-center rounded-md bg-orange-500 p-4 font-bold text-white">
          <button
            className="absolute right-2 top-2 cursor-pointer"
            onClick={onClose}
          >
            ❌
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("global-modal") as HTMLElement,
  );
};

export default Modal;
