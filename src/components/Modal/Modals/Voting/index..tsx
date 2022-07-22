import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NETWORK_EXPLORER_URLS, SupportedChainId } from "src/helpers/constants";
import { useClient } from "src/hooks/useClient";
import { ProposalType } from "src/hooks/useProposals";
import { Space } from "src/hooks/useSpaces";
import { usePower } from "src/hooks/usePower";

import { ModalUpdaterContext } from "src/components/WithModal";
import ExternalLink from "src/components/ExternalLink";
import Spinner from "src/components/Spinner";
import { useTokenBalance } from "src/hooks/useTokenBalance";

type VotingModalButtonProps = {
  proposal: ProposalType;
  checkedChoice: number;
};

function VotingModalButton(props: VotingModalButtonProps) {
  const { proposal, checkedChoice } = props;
  const requiredAmountToVote = parseFloat(window.REQUIRED_AMOUNT_TO_VOTE);

  const { balance, isTokenBalanceLoading } = useTokenBalance();

  const [isEnoughBalanceToPublish, setIsEnoughBalanceToPublish] = useState(balance >= requiredAmountToVote);
  const [isActive, setIsActive] = useState( checkedChoice !== -1 && proposal.state !== "pending" && isTokenBalanceLoading && isEnoughBalanceToPublish);

  const setModalOptions = useContext(ModalUpdaterContext);

  const closeModal = () => setModalOptions({ isOpen: false });

  useEffect(() => {
    setIsActive(checkedChoice !== -1 && proposal.state !== "pending" && isTokenBalanceLoading && isEnoughBalanceToPublish);
  }, [checkedChoice, proposal.state, isTokenBalanceLoading, isEnoughBalanceToPublish]);

  useEffect(() => {
    setIsEnoughBalanceToPublish(balance >= requiredAmountToVote)
  }, [balance]);

  const modalProps = {
    headerContent: "Confirm vote",
    bodyContent: (
      <VoteModalContent
        proposal={proposal}
        checkedChoice={checkedChoice}
        closeModal={closeModal}
      />
    ),
    onCancel: () => closeModal(),
  };

  const onVoteClick = () => {
    setModalOptions({ isOpen: true, modalProps });
  };

  return (
    <button
      className={`primaryButton ${isActive ? "active" : ""}`}
      disabled={!isActive}
      onClick={onVoteClick}
    >
      <span>
        {
          proposal.state === "pending"
          ? "Wait for voting start"
          : checkedChoice === -1
          ? "Make your choice"
          : isTokenBalanceLoading
          ? "Checking balance..."
          : !isEnoughBalanceToPublish
          ? `Minimum required amount to Vote is ${requiredAmountToVote} ${window.TOKEN_SYMBOL}`
          : "Vote"}
      </span>
    </button>
  );
}

type VotingModalContentProps = {
  proposal: ProposalType;
  checkedChoice: number;
  closeModal: () => void;
};

const VoteModalContent = (props: VotingModalContentProps) => {
  const navigate = useNavigate();

  const { proposal, checkedChoice, closeModal } = props;
  const { network, choices, snapshot, strategies } = proposal;

  const { send, clientLoading } = useClient();
  const { power } = usePower(proposal);

  const tokenSymbol = strategies[0].params.symbol;
  const networkId = +network as SupportedChainId;

  const isFooterButtonActive = !!power && !clientLoading;

  const handleSubmit = async () => {
    const vote = {
      proposal,
      choice: checkedChoice + 1,
      metadata: {},
    };

    try {
      const result = await send(proposal.space as Space, "vote", vote);
      console.log("Result", result);
      closeModal();

      navigate(`/proposals}`);
      navigate(`/proposal/${proposal.id}`);
    } catch (error: any) {
      console.error(`Can't set vote. Error: ${error.message || error}`);
    }
  };

  return (
    <>
      <div className="voteBody">
        <div className="textCenter boldText">
          Are you sure you want to vote "{choices[checkedChoice]}"?
          <br />
          This action cannot be undone.
        </div>
        <div className="border rounded-md m-1 p-1">
          <div className="flex">
            <span className="flexAuto textColor">Option(s)</span>
            <span className="textRight">{choices[checkedChoice]}</span>
          </div>
          <div className="flex">
            <span className="flexAuto textColor">Snapshot</span>
            <ExternalLink
              className="mr-1"
              link={`${NETWORK_EXPLORER_URLS[networkId]}block/${snapshot}`}
              children={snapshot}
            />
          </div>
          <div className="flex">
            <span className="flexAuto textColor">Your voting power</span>
            <span className="textRight">
              {power} {tokenSymbol}
            </span>
          </div>
        </div>
      </div>
      <div className="textCenter p-1 border-t">
        <button
          type="button"
          className={`primaryButton ${isFooterButtonActive ? "active" : ""}`}
          onClick={handleSubmit}
          disabled={!isFooterButtonActive}
        >
          {!isFooterButtonActive ? (
            <Spinner
              color={"white"}
              style={{ height: "1rem", marginRight: "0.5rem" }}
            />
          ) : (
            "Vote"
          )}
        </button>
      </div>
    </>
  );
};

export default VotingModalButton;
