import { useContext } from "react";
import { ModalStateContext } from "../WithModal";
import "./index.scss";

function Modal() {
  const { isOpen, modalProps = {} } = useContext(ModalStateContext);

  const { headerContent, bodyContent, footerContent, onCancel } = modalProps;

  return isOpen ? (
    <div className="modalOverlay">
      <div
        className="modalWrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="daoModal">
          <div className="modalHeader">
            {headerContent && (
              <div className="headerContent">{headerContent}</div>
            )}
            <button
              type="button"
              className="modalCloseButton"
              data-dismiss="daoModal"
              aria-label="Close"
              onClick={(e) => onCancel(e)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {bodyContent && <div className="modalBody">{bodyContent}</div>}
          {footerContent && <div className="modalFooter">{footerContent}</div>}
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
