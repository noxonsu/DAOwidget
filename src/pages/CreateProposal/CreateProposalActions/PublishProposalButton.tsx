import { useState } from "react";

import "./index.scss";

type PublishProposalButtonProps = {

};

function PublishProposalButton(props: PublishProposalButtonProps) {
  const {  } = props;

  const [isActive, setIsActive] = useState(true);

  const onVoteClick = () => {
    console.log("click on publish");
  };

  return (
    <button
      className={`publishProposalButton ${isActive ? "active" : ""}`}
      disabled={!isActive}
      onClick={onVoteClick}
    >
      <span>Publish</span>
    </button>
  );
}

export default PublishProposalButton;
