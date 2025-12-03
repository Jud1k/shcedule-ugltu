import { useEffect, useRef } from 'react';

interface ModalProps {
  header: string;
  triggerButton: React.ReactElement;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}

export default function Modal({
  header,
  triggerButton,
  children,
  isOpen,
  onClose,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      {triggerButton}
      <dialog
        ref={modalRef}
        className="modal transition-all duration-300 backdrop:bg-black/60"
        onClose={onClose}
      >
        <div className="modal-box max-w-md p-0 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-green-600 to-green-400 p-6">
            <h3 className="font-bold text-xl text-white">{header}</h3>
          </div>
          <div className="p-6 bg-base-100">{children}</div>
        </div>

        <div className="modal-backdrop" onClick={onClose}>
          <button>close</button>
        </div>
      </dialog>
    </>
  );
}
