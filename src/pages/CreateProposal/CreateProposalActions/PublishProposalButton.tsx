import { useState, useEffect } from "react";

import Spinner from "src/components/Spinner";
import { useTokenBalance } from "src/hooks/useTokenBalance";

import "./index.scss";

type PublishProposalButtonProps = {
  isTitleFilled: boolean;
  isActionFilled: boolean;
  isLoading: boolean;
  onClick: () => void;
};

function PublishProposalButton(props: PublishProposalButtonProps) {
  const { isTitleFilled, isActionFilled, isLoading, onClick } = props;

  const { balance, isTokenBalanceLoading } = useTokenBalance();

  const [isActive, setIsActive] = useState(!isLoading && !isTokenBalanceLoading && !isActionFilled && !isTitleFilled && balance !== "0");

  const onVoteClick = () => {
    console.log("click on publish");
    onClick();
  };

  useEffect(() => {
    setIsActive(!isLoading && !isTokenBalanceLoading && isTitleFilled && isActionFilled && balance !== "0");
  }, [balance, isActionFilled, isTitleFilled, isLoading, isTokenBalanceLoading]);

  return (
    <button
      className={`primaryButton ${isActive ? "active" : ""}`}
      disabled={!isActive}
      onClick={onVoteClick}
    >
      <span>
        {
          isLoading || isTokenBalanceLoading
          ? (
            <Spinner
              color={"white"}
              style={{ height: "1rem", marginRight: "0.5rem" }}
            />
          )
          : !isTitleFilled
          ? "Please, fill title"
          : !isActionFilled
          ? "Please, set all actions"
          : balance === "0"
          ? `You haven't enough  ${window.TOKEN_SYMBOL} tokens`
          : "Publish"
        }
      </span>
    </button>
  );
}

export default PublishProposalButton;
