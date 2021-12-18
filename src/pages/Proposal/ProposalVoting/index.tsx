import { useState } from "react";
import VotingModalButton from "src/components/WithModal/Modals/Voting/index.";
import { ProposalType } from "src/hooks/useProposals";
import ChoiceButton from "./ChoiceButton";

import "./index.scss";

type ProposalVotesType = {
  proposal: ProposalType;
};

function ProposalVoting(props: ProposalVotesType) {
  const { proposal } = props;

  const { choices } = proposal;

  const [checkedChoice, setCheckedChoice] = useState(-1);

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
          <VotingModalButton
            checkedChoice={checkedChoice}
            proposal={proposal}
          />
        </div>
      </div>
    </>
  );
}

export default ProposalVoting;
