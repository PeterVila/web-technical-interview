import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
  onClose: () => void,
  isOpen: boolean,
  children: React.ReactNode;
}

const Modal = ({ onClose, isOpen, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    if (event.target && modalRef.current && !modalRef.current.contains(event.target as HTMLElement)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Handler only applies to keyboard navigation through tabbing
    if (e.key !== 'Tab') return

    // Query of possible focusable elements within my modal
    const focusableModalElements = modalRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select'
    )

    if (focusableModalElements) {
      const firstElement = focusableModalElements[0]
      const lastElement = focusableModalElements[focusableModalElements.length - 1]
      // if going forward by pressing tab and lastElement is active shift focus to first focusable element 
      if (!e.shiftKey && document.activeElement === lastElement) {
        (firstElement as HTMLElement).focus()
        return e.preventDefault()
      }
  
      // if going backward by pressing tab and firstElement is active shift focus to last focusable element 
      if (e.shiftKey && document.activeElement === firstElement) {
        (lastElement as HTMLElement).focus();
        e.preventDefault()
      }
    }

  }


  return (
    <div className="fixed inset-0 z-50 flex h-fit justify-center mt-6">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-lg w-full max-w-lg relative" ref={modalRef} onKeyDown={(e) => keyDownHandler(e)}>
        <div className="absolute top-0 right-0 p-2">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 p-3">
            <FontAwesomeIcon icon={faX} aria-label='Bedrooms' />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal