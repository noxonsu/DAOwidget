import { useContext, useState, useEffect } from "react";
import { ModalUpdaterContext } from "src/components/WithModal";

import ExternalLink from "src/components/ExternalLink";
import { NETWORK_EXPLORER_URLS, SupportedChainId } from "src/helpers/constants";
import { useClient } from "src/hooks/useClient";
import { ProposalType } from "src/hooks/useProposals";
import { Space } from "src/hooks/useSpaces";
import { usePower } from "src/hooks/usePower";

type VotingModalButtonProps = {
  proposal: ProposalType;
  checkedChoice: number;
};

function VotingModalButton(props: VotingModalButtonProps) {
  const { proposal, checkedChoice } = props;

  const [isActive, setIsActive] = useState(checkedChoice !== -1);

  const setModalOptions = useContext(ModalUpdaterContext);

  const { send } = useClient();

  const { power } = usePower(proposal);
  const { network, choices, snapshot, strategies } = proposal;
  const tokenSymbol = strategies[0].params.symbol;

  const networkId = +network as SupportedChainId;

  useEffect(() => {
    setIsActive(checkedChoice !== -1);
  }, [checkedChoice]);

  const handleSubmit = async () => {
    const vote = {
      proposal,
      choice: checkedChoice + 1,
      metadata: {},
    };

    const result = await send(proposal.space as Space, "vote", vote);
    console.log("Result", result);
  };

  const bodyContent = (
    <div className="modalBody">
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
  );

  const footerContent = (
    <div className="textCenter p-1 border-t">
      <button
        type="button"
        className={`primaryButton ${!!power ? "active" : ""}`}
        onClick={handleSubmit}
        disabled={power === 0}
      >
        Vote
      </button>
    </div>
  );

  const modalProps = {
    headerContent: "Confirm vote",
    bodyContent,
    footerContent,
    onCancel: () => setModalOptions({ isOpen: false }),
  };

  const onVoteClick = () => {
    console.log("click on vote");
    setModalOptions({ isOpen: true, modalProps });
  };

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

export default VotingModalButton;
