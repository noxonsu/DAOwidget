type ChoiceButtonsType = {
  text: string;
  id?: string;
  isActive: boolean;
  onClick: () => void;
};

function ChoiceButton(props: ChoiceButtonsType) {
  const { isActive, id, text, onClick } = props;

  return (
    <button
      id={id}
      onClick={onClick}
      className={`secondaryButton ${isActive ? "active" : ""}`}
    >
      <span>{text}</span>
    </button>
  );
}

export default ChoiceButton;
