import { useState } from "react";
import ExternalLink from "src/components/ExternalLink";
import Modal from "src/components/Modal";
import { NETWORK_EXPLORER_URLS, SupportedChainId } from "src/helpers/constants";
import { ProposalType } from "src/hooks/useProposals";
import ChoiceButton from "./ChoiceButton";

import "./index.scss";
import VoteButton from "./VoteButton";

type ProposalVotesType = {
  proposal: ProposalType;
};

function ProposalVoting(props: ProposalVotesType) {
  const { proposal } = props;

  const { choices, network, snapshot } = proposal;

  const [checkedChoice, setCheckedChoice] = useState(-1);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);

  return (
    <>
      <div className="voting">
        <div className="votingHeader">Cast your vote</div>
        <div className="p-1">
          <div className="mb-1">
            {choices.map((choice, i) => {
              return (
                <ChoiceButton
                  key={i}
                  id={`choice-${i}`}
                  text={choice}
                  isActive={checkedChoice === i}
                  onClick={() => {
                    setCheckedChoice(i);
                  }}
                />
              );
            })}
          </div>
          <VoteButton
            openModal={() => {
              setIsVoteModalOpen(true);
            }}
          />
        </div>
      </div>
      {isVoteModalOpen && (
        <Modal
          headerContent={"Confirm vote"}
          bodyContent={
            <VotingModalContent
              proposal={proposal}
              checkedChoice={checkedChoice}
            />
          }
          handleClose={() => {
            setIsVoteModalOpen(false);
          }}
        />
      )}
    </>
  );
}

type VotingModalContentProps = {
  proposal: ProposalType;
  checkedChoice: number;
};

function VotingModalContent(props: VotingModalContentProps) {
  const { proposal, checkedChoice } = props;
  const { network, choices, snapshot, strategies } = proposal;
  const tokenSymbol = strategies[0].params.symbol;

  const networkId = +network as SupportedChainId;

  return (
    <>
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
            <span className="textRight">0 {tokenSymbol}</span>
          </div>
        </div>
      </div>
      <div className="modalFooter"></div>
    </>
  );
}

export default ProposalVoting;
