import { useState, useEffect } from "react";

import "./index.scss";

type VoteButtonProps = {
  openModal: () => void;
  checkedChoice: number;
};

function VoteButton(props: VoteButtonProps) {
  const { openModal, checkedChoice } = props;

  const [isActive, setIsActive] = useState(checkedChoice !== -1);

  const onVoteClick = () => {
    console.log("click on vote");
    openModal();
  };

  useEffect(() => {
    console.log('on')
    setIsActive(checkedChoice !== -1)
  }, [checkedChoice])

  console.log('isActive', isActive)

  return (
    <button
      className={`primaryButton ${isActive ? "active" : ""}`}
      disabled={!isActive}
      onClick={onVoteClick}
    >
      <span>Vote</span>
    </button>
  );
}

export default VoteButton;
