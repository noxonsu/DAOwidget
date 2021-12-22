import { useState, useEffect } from "react";

import Spinner from "src/components/Spinner";

import "./index.scss";

type PublishProposalButtonProps = {
  disable: boolean;
  isLoading: boolean;
  onClick: () => void;
};

function PublishProposalButton(props: PublishProposalButtonProps) {
  const { disable, isLoading, onClick } = props;

  const [isActive, setIsActive] = useState(!disable && !isLoading);

  const onVoteClick = () => {
    console.log("click on publish");
    onClick();
  };

  useEffect(() => {
    setIsActive(!disable && !isLoading)
  }, [disable, isLoading])

  return (
    <button
      className={`primaryButton ${isActive ? "active" : ""}`}
      disabled={!isActive}
      onClick={onVoteClick}
    >
      <span>
        {isLoading
        ? <Spinner
            color={"white"}
            style={{ height: "1rem", marginRight: "0.5rem" }}
          />
        : 'Publish'}
      </span>
    </button>
  );
}

export default PublishProposalButton;
