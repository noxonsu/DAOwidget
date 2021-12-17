import { useState } from "react";

import "./index.scss";

type PublishProposalButtonProps = {
  disable: boolean;
  onClick: () => void;
};

function PublishProposalButton(props: PublishProposalButtonProps) {
  const { disable, onClick } = props;

  const [isActive, setIsActive] = useState(disable);

  const onVoteClick = () => {
    console.log("click on publish");
    onClick();
  };

  return (
    <button
      className={`primaryButton ${!disable ? "active" : ""}`}
      disabled={disable}
      onClick={onVoteClick}
    >
      <span>Publish</span>
    </button>
  );
}

export default PublishProposalButton;
