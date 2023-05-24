import classes from './Modal.module.css'
import { useCallback, useEffect, useRef } from 'react';


const Modal = ({ isOpen, onClose, onDelete, id }) => {

  const modalOverlayRef = useRef(null)

  const handleCloseModal = useCallback(() => {
    onClose();
  }, [onClose])

  const handleOverlayClick = useCallback((event) => {
    if (event.target === modalOverlayRef.current) {
      handleCloseModal();
    }
  }, [handleCloseModal])

  const handleDeleteClick = useCallback(() => {
    onDelete();
    handleCloseModal();
  }, [onDelete, handleCloseModal]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOverlayClick);
    } else {
      document.removeEventListener("mousedown", handleOverlayClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [isOpen, handleOverlayClick]);

  if (!isOpen) {
    return null;
  }


  return (
    <div className={classes.modalOverlay} ref={modalOverlayRef}>
      <div className={classes.modal}>
        <div className={classes.modalContent}>
          <h2>Delete comment</h2>
          <p>Are you sure you want to delete this comment? This will remove the content and can't be undone</p>
          <div className={classes.btns}>
            <button className={classes.cancelBtn} onClick={onClose}>no, cancel</button>
            <button className={classes.confirmBtn} onClick={handleDeleteClick}>yes, delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal