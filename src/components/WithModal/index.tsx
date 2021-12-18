import { createContext, useState } from "react";
import Modal from "../Modal";

type ModalState = {
  isOpen: boolean;
  modalProps?: IUniversalObj;
};

type SetModalState = ({ isOpen, modalProps }: ModalState) => void;

type WithModalProps = {
  children?: any;
};

const initState = {
  isOpen: false,
  modalProps: {},
};

export const ModalStateContext = createContext({} as ModalState);
export const ModalUpdaterContext = createContext({} as SetModalState);

const WithModal = ({ children }: WithModalProps) => {
  const { modalState: modalOptions, setModalState: setModalOptions } =
    useModalState(initState);

  return (
    <ModalUpdaterContext.Provider value={setModalOptions}>
      <ModalStateContext.Provider value={modalOptions}>
        <Modal />
        {children}
      </ModalStateContext.Provider>
    </ModalUpdaterContext.Provider>
  );
};

const useModalState = (initialState: ModalState) => {
  const [isOpen, setIsOpen] = useState(initialState.isOpen);
  const [modalProps, setModalProps] = useState(initialState.modalProps);

  const setModalState: SetModalState = ({
    isOpen,
    modalProps = {},
  }: ModalState) => {
    setIsOpen(isOpen);
    setModalProps(modalProps);
  };

  const modalState: ModalState = { isOpen, modalProps };

  return { modalState, setModalState };
};

export default WithModal;
