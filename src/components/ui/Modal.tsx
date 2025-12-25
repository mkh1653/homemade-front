"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  showModal: boolean;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  showModal,
  title,
}) => {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (showModal) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [showModal]);

  if (!mounted) return null;

  return createPortal(
    <dialog
      ref={modalRef}
      className='modal backdrop-blur-md'
      onClose={onClose}
      dir='rtl'>
      <div className='modal-box'>
        <button
          onClick={onClose}
          className='btn btn-sm btn-circle btn-ghost absolute left-2 top-2 pt-0.5'>
          ✕
        </button>

        {title && <h3 className='font-bold text-lg mb-4'>{title}</h3>}

        {children}
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>,
    document.body
  );
};

export default Modal;
