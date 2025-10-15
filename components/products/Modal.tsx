// components/ui/Modal.tsx
import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <div
        className="relative w-[100vw] h-[100vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-4xl bg-black/50 rounded-full px-3 py-1 hover:bg-black/70 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;