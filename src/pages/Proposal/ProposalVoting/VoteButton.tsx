import { useState } from "react";

import "./index.scss";

type VoteButtonProps = {
  openModal: () => void;
};

function VoteButton(props: VoteButtonProps) {
  const { openModal } = props;

  const [isActive, setIsActive] = useState(true);

  const onVoteClick = () => {
    console.log("click on vote");
    setIsActive(!isActive);
    openModal()
  };

  return (
    <button
      className={`voteButton ${isActive ? "active" : ""}`}
      disabled={!isActive}
      onClick={onVoteClick}
    >
      <span>Vote</span>
    </button>
  );
}

export default VoteButton;
