import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent/ModalContent';

type ModalProps = {
  children?: ReactNode;
  text?: string;
  classBtn?: string;
  classModal?: string;
  id?: number;
  titleModal?: string;
  showModal?: boolean;
  handleOpenModal?: () => void;
  handleCloseModal?: () => void;
};

function Modal({
  children,
  text,
  classBtn,
  classModal,
  titleModal,
  showModal,
  handleOpenModal,
  handleCloseModal,
}: ModalProps) {
  return (
    <>
      <button onClick={handleOpenModal} className={classBtn}>
        {text}
      </button>
      {showModal &&
        createPortal(
          <ModalContent
            children={children}
            onClose={handleCloseModal}
            titleModal={titleModal}
            classModal={classModal}
          />,
          document.body,
        )}
    </>
  );
}

export default Modal;
