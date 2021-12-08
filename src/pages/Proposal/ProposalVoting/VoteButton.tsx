import { useState } from "react";

import './index.scss'

type VoteButtonProps = {
};

function VoteButton(props: VoteButtonProps) {
  const [isActive, setIsActive] = useState(true)

  const onVoteClick = () => {
      console.log('click on vote')
      setIsActive(!isActive)
  }

  return (
    <button className={`voteButton ${isActive ? "active" : ""}`}  disabled={!isActive} onClick={onVoteClick}>
      <span>Vote</span>
    </button>
  );
}

export default VoteButton;