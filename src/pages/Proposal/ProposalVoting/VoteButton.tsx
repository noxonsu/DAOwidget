import { useState } from "react";

import "./index.scss";

type VoteButtonProps = {
  openModal: () => void;
  checkedChoice: number;
};

function VoteButton(props: VoteButtonProps) {
  const { openModal, checkedChoice } = props;

  const [isActive, setIsActive] = useState(true);

  const onVoteClick = () => {
    console.log("click on vote");
    openModal();
  };

  return (
    <button
      className={`primaryButton ${isActive ? "active" : ""}`}
      disabled={!isActive || checkedChoice === -1}
      onClick={onVoteClick}
    >
      <span>Vote</span>
    </button>
  );
}

export default VoteButton;
