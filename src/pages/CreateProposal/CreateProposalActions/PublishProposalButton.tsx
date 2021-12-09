import { useState } from "react";

import "./index.scss";

type PublishProposalButtonProps = {
  disable: boolean;
};

function PublishProposalButton(props: PublishProposalButtonProps) {
  const { disable } = props;

  const [isActive, setIsActive] = useState(disable);

  const onVoteClick = () => {
    console.log("click on publish");
  };

  return (
    <button
      className={`publishProposalButton ${disable ? "active" : ""}`}
      disabled={disable}
      onClick={onVoteClick}
    >
      <span>Publish</span>
    </button>
  );
}

export default PublishProposalButton;
