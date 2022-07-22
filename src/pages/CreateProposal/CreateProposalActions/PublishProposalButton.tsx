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
  const requiredAmountToPublish = parseFloat(window.REQUIRED_AMOUNT_TO_PUBLISH);

  const { balance, isTokenBalanceLoading } = useTokenBalance();

  const [isEnoughBalanceToPublish, setIsEnoughBalanceToPublish] = useState(balance >= requiredAmountToPublish);

  const [isActive, setIsActive] = useState(!isLoading && !isTokenBalanceLoading && !isActionFilled && !isTitleFilled && isEnoughBalanceToPublish);

  const onVoteClick = () => {
    onClick();
  };

  useEffect(() => {
    setIsActive(!isLoading && !isTokenBalanceLoading && isTitleFilled && isActionFilled && isEnoughBalanceToPublish);
  }, [isActionFilled, isTitleFilled, isLoading, isTokenBalanceLoading, isEnoughBalanceToPublish]);

  useEffect(() => {
    setIsEnoughBalanceToPublish(balance >= requiredAmountToPublish)
  }, [balance]);

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
          : !isEnoughBalanceToPublish
          ? `Minimum required amount to Publish is ${requiredAmountToPublish} ${window.TOKEN_SYMBOL}`
          : "Publish"
        }
      </span>
    </button>
  );
}

export default PublishProposalButton;
