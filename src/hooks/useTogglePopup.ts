import { useState, useEffect, useCallback } from 'react';

function useTogglePopup() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleEscClose = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseModal();
      }
    },
    [handleCloseModal],
  );

  const handleCloseOverlayClick = useCallback(
    (evt: MouseEvent) => {
      const target = evt.target;
      if (target && (target as Element).classList.contains('modal')) {
        handleCloseModal();
      }
    },
    [handleCloseModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mousedown', handleCloseOverlayClick);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleCloseOverlayClick);
    };
  }, [handleCloseOverlayClick, handleEscClose]);

  return { showModal, setShowModal, handleOpenModal, handleCloseModal };
}

export default useTogglePopup;
