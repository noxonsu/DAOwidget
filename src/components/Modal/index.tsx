import "./index.scss";

type ModalProps = {
  headerContent: any;
  bodyContent: any;
  handleClose: () => void
};

function Modal(props: ModalProps) {
  const {
    headerContent,
    bodyContent,
    handleClose,
  } = props;

  return (
    <div className="modalOverlay">
      <div
        className="modalWrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal">
          <div className="modalHeader">
            <div className="headerContent">
              {headerContent}
            </div>
            <button type="button" className="modalCloseButton" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="bodyContent">{bodyContent}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
